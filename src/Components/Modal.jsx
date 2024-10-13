import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
  } from "@nextui-org/react";
  import { FaPlus } from "react-icons/fa";
  import JoditEditor from 'jodit-react';
  import { useState, useRef } from "react";
  import { FiUpload } from "react-icons/fi";
import { BlogPost, getBlog } from "../Api/UserApi";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage , ref , uploadBytes} from "firebase/storage";
import app from "../Configuration/firebase";


  const ModalOpen = ({newData}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [content, setContent] = useState('');
    const reff = useRef(null);
    const [coverImage, setCoverImage] = useState(null);
    const [optionalImage, setOptionalImage] = useState(null);
    const [coverImagePrev, setCoverImagePrev] = useState(null);
    const [optionalImagePrev, setOptionalImagePrev] = useState(null);
    const [errors, setErrors] = useState({});
    const [blog,setBlog] = useState({})
    // Handle Cover Image Change
    const handleCoverChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCoverImage(file)
        setCoverImagePrev(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, coverImage: null }));
      }
    };
  
    // Handle Optional Image Change
    const handleOptionalImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setOptionalImage(file)
        setOptionalImagePrev(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, optionalImage: null }));
      }
    };

    const getBlogData = async()=> {
      try {
        const  response = await getBlog()
        console.log(response)
      } catch (error) {
        console.log(error);
        
      }
    }
  
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const form = e.target;
      const heading = form.heading.value.trim();
  
      // Basic Validation
      const newErrors = {};
  
      if (!coverImage) {
        newErrors.coverImagePrev = "Cover picture is required.";
      }
  
      if (!heading) {
        newErrors.heading = "Heading is required.";
      }
  
      if (!content || content.trim() === '') {
        newErrors.content = "Content is required.";
      }
  
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length > 0) {
        return;
      }
      let optionalImageUrl = null;
      let coverImageUrl = null;

      
      
      if(coverImage){        
        const storage  =  getStorage(app)
        const storageRef = ref(storage, 'coverImage/'+ coverImage.name);
        await uploadBytes(storageRef, coverImage)
        coverImageUrl = await getDownloadURL(storageRef);
        console.log('from fire base',coverImageUrl);
      }
      
      
      
      if(optionalImage){
        const storage  =  getStorage(app)
        const storageRef = ref(storage, 'optionalImage/'+ optionalImage.name);
        await uploadBytes(storageRef, optionalImage)
        optionalImageUrl = await getDownloadURL(storageRef);
        console.log('from fire base',optionalImageUrl);
      }
      let data ={
        heading: heading,
        content: content,
        coverImage: coverImageUrl,
      }
      if(optionalImage){
     data.optionalImage = optionalImageUrl
      }
      
      const response = await BlogPost(data)
      console.log('ddddddddddddd',response)
      newData(response.data.data)
      toast.success('Blog Posted Successfully')
      onOpenChange(false);
  
      setCoverImage(null);
      setOptionalImage(null);
      setCoverImagePrev(null)
      setOptionalImagePrev(null)
      setContent('');
      form.reset();
      setErrors({});
    };
  
    return (
      <>
        <div
          onClick={onOpen}
          className="rounded-full bg-blue-500 w-16 h-16 flex justify-center items-center cursor-pointer shadow-lg hover:bg-blue-600 transition duration-300"
          title="Open Modal"
        >
          <FaPlus className="text-white text-2xl" />
        </div>
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} closeButton>
          <ModalContent>
            <form onSubmit={handleSubmit} >
              <ModalHeader className="text-center text-xl font-semibold text-gray-700">
                Create New Post
              </ModalHeader>
  
              <ModalBody className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-gray-600 font-medium">Upload Cover Picture</span>
                  <label
                    htmlFor="coverUpload"
                    className={`cursor-pointer p-2 border border-dashed rounded-lg text-gray-600 hover:border-blue-500 transition duration-300 flex flex-col items-center justify-center ${
                      errors.coverImage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {coverImagePrev ? (
                      <img src={coverImagePrev} alt="Cover Preview" className="h-32 w-32 object-cover rounded-lg shadow-md mt-4" />
                    ) : (
                      <>
                        <FiUpload className="text-2xl mb-2" />
                        <span>Click to Upload</span>
                      </>
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
                    <span className="text-red-500 text-sm">{errors.coverImagePrev}</span>
                  )}
                </div>
  
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-gray-600 font-medium">Upload Optional Image</span>
                  <label
                    htmlFor="optionalUpload"
                    className={`cursor-pointer p-2 border border-dashed rounded-lg text-gray-600 hover:border-blue-500 transition duration-300 flex flex-col items-center justify-center ${
                      errors.optionalImage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {optionalImagePrev ? (
                      <img src={optionalImagePrev} alt="Optional Preview" className="h-32 w-32 object-cover rounded-lg shadow-md mt-4" />
                    ) : (
                      <>
                        <FiUpload className="text-2xl mb-2" />
                        <span>Click to Upload</span>
                      </>
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
                    <span className="text-red-500 text-sm">{errors.optionalImagePrev}</span>
                  )}
                </div>
  
                <div>
                  <span className="block text-gray-600 mb-2 font-medium">Heading</span>
                  <input
                    type="text"
                    name="heading"
                    className={`w-full h-12 p-3 rounded-md border focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm outline-none ${
                      errors.heading ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter a heading"
                    required
                  />
                  {errors.heading && (
                    <span className="text-red-500 text-sm">{errors.heading}</span>
                  )}
                </div>
  
                <div>
                  <span className="block text-gray-600 mb-2 font-medium">Content</span>
                  <JoditEditor
                    className={`border rounded-lg p-2 shadow-sm ${
                      errors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                    ref={reff}
                    value={content}
                    onChange={(content) => setContent(content)}
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
                  className="bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-300"
                >
                  Post
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalOpen;
  