import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  import { FaPlus, FaEdit } from "react-icons/fa";
  import JoditEditor from "jodit-react";
  import { useState, useRef, useEffect } from "react";
  import { toast } from "react-toastify";
  import { FiUpload } from "react-icons/fi";
  import { editBlogPost } from "../Api/UserApi";
  import { getDownloadURL, getStorage , ref , uploadBytes} from "firebase/storage";
  import app from "../Configuration/firebase";

  const EditModal = ({
    coverImageProp,
    headingProp,
    contentProp,
    optionalImageProp,
    id,
    onUpdate
  }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   console.log('fff',coverImageProp);
  
    const [content, setContent] = useState(contentProp || "");
    const [heading, setHeading] = useState(headingProp || "");
    const [coverImage, setCoverImage] = useState(null);
    const [optionalImage, setOptionalImage] = useState(null);
    const [coverImagePrev, setCoverImagePrev] = useState(coverImageProp);
    const [optionalImagePrev, setOptionalImagePrev] = useState(optionalImageProp);
    const [errors, setErrors] = useState({});
  
    const reff = useRef(null);
  
    // Update preview when the props change
    useEffect(() => {
    setCoverImagePrev(coverImageProp);
      setOptionalImagePrev(optionalImageProp);
      setHeading(headingProp);
      setContent(contentProp);
    }, [coverImageProp, optionalImageProp, headingProp, contentProp]);
  
    const handleCoverChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCoverImage(file);
        setCoverImagePrev(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, coverImage: null }));
      }
    };
  
    const handleOptionalImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setOptionalImage(file);
        setOptionalImagePrev(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, optionalImage: null }));
      }
    };
  
    const validate = () => {
      const newErrors = {};
      if (!coverImage && !coverImagePrev) {
        newErrors.coverImagePrev = "Cover picture is required.";
      }
      if (!heading.trim()) {
        newErrors.heading = "Heading is required.";
      }
      if (!content.trim()) {
        newErrors.content = "Content is required.";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const hasChanges = () => {
      // Check if anything has changed compared to the original props
      return (
        coverImage ||
        optionalImage ||
        heading !== headingProp ||
        content !== contentProp
      );
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!validate()) return;
  
      if (!hasChanges()) {
        toast.info("No changes made.");
        return;
      }
  
      let data ={}

      let optionalImageUrl = null
      let coverImageUrl = null
      // Append only the changed data
      if (coverImage) {
        const storage  =  getStorage(app)
        const storageRef = ref(storage, 'coverImage/'+ coverImage.name);
        await uploadBytes(storageRef, coverImage)
        coverImageUrl = await getDownloadURL(storageRef);
        console.log('from fire base',coverImageUrl);
        data.coverImage = coverImageUrl
       }

      if (optionalImage) {
        const storage  =  getStorage(app)
        const storageRef = ref(storage, 'optionalImage/'+ optionalImage.name);
        await uploadBytes(storageRef, optionalImage)
        optionalImageUrl = await getDownloadURL(storageRef);
        console.log('from fire base',optionalImageUrl);  
        data.optionalImage = optionalImageUrl    
      }
      

      if (heading !== headingProp) {
        data.heading = heading;
      }
    
      if (content !== contentProp) {
       data.content = content;
      }
  
  
      try {
        const response = await editBlogPost(id, data);
        console.log("Responsexxxx:", response.data.data);
        onUpdate(response.data.data);
        
        toast.success("Blog updated successfully");
        onOpenChange(false);
  
        // Reset state after submission
        setCoverImage(null);
        setOptionalImage(null);
        setCoverImagePrev(null);
        setOptionalImagePrev(null);
        setContent("");
        setHeading("");
        setErrors({});
      } catch (error) {
        toast.error("Failed to update the blog");
      }
    };
  
    return (
      < >
        <div
          onClick={onOpen}
          className="rounded-full flex justify-center items-center   cursor-pointer shadow-lg hover:bg-blue-600 transition duration-300"
          title="Open Modal"
        >
          <FaEdit size={20} className="hover:text-blue-500" />
        </div>
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton  >
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="text-center text-xl font-semibold mt-52 text-gray-700">
                Edit Post
              </ModalHeader>
  
              <ModalBody className="p-6 space-y-6">
                {/* Cover Image */}
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-gray-600 font-medium">
                    Upload Cover Picture
                  </span>
                  <label
                    htmlFor="coverUpload"
                    className={`cursor-pointer p-2 border border-dashed rounded-lg text-gray-600 hover:border-blue-500 transition duration-300 flex flex-col items-center justify-center ${
                      errors.coverImagePrev ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {coverImagePrev ? (
                      <img
                        src={coverImagePrev}
                        alt="Cover Preview"
                        className="h-32 w-32 object-cover rounded-lg shadow-md mt-4"
                      />
                    ) : (
                      <span className="text-gray-400">Select an image</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="coverUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  {errors.coverImagePrev && (
                    <span className="text-red-500 text-sm">
                      {errors.coverImagePrev}
                    </span>
                  )}
                </div>
  
                {/* Optional Image */}
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-gray-600 font-medium">
                    Upload Optional Image
                  </span>
                  <label
                    htmlFor="optionalUpload"
                    className={`cursor-pointer p-2 border border-dashed rounded-lg text-gray-600 hover:border-blue-500 transition duration-300 flex flex-col items-center justify-center ${
                      errors.optionalImage
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {optionalImagePrev ? (
                      <img
                        src={optionalImagePrev}
                        alt="Optional Preview"
                        className="h-32 w-32 object-cover rounded-lg shadow-md mt-4"
                      />
                    ) : (
                      <span className="text-gray-400">Select an image</span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="optionalUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleOptionalImageChange}
                  />
                  {errors.optionalImagePrev && (
                    <span className="text-red-500 text-sm">
                      {errors.optionalImagePrev}
                    </span>
                  )}
                </div>
  
                {/* Heading */}
                <div>
                  <span className="block text-gray-600 mb-2 font-medium">
                    Heading
                  </span>
                  <input
                    type="text"
                    name="heading"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className={`w-full h-12 p-3 rounded-md border focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm outline-none ${
                      errors.heading ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter a heading"
                    required
                  />
                  {errors.heading && (
                    <span className="text-red-500 text-sm">{errors.heading}</span>
                  )}
                </div>
  
                {/* Content */}
                <div>
                  <span className="block text-gray-600 mb-2 font-medium">
                    Content
                  </span>
                  <JoditEditor
                    className={`border rounded-lg p-2 shadow-sm ${
                      errors.content ? "border-red-500" : "border-gray-300"
                    }`}
                    ref={reff}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                  />
                  {errors.content && (
                    <span className="text-red-500 text-sm">{errors.content}</span>
                  )}
                </div>
              </ModalBody>
  
              <ModalFooter className="flex justify-end space-x-3 p-4">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onOpenChange}
                  className="hover:bg-red-50 transition duration-300"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 transition duration-300"
                >
                  Update
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default EditModal;
  