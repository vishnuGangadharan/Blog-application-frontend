import axiosInstance from "../Configuration/axiosInstance";
const token = localStorage.getItem('token')
import { toast } from 'react-toastify';

console.log('kkkkkkkkkkkkkkkkkkkk',token);


export const signup = async(data) => {
    try {
        const response = await axiosInstance.post('/signup', data)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
    }
}



export const login = async(data) => {
    try {
        const response = await axiosInstance.post('/login', data)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
    }
}

export const BlogPost = async(data) => {
    try {
        const response = await axiosInstance.post('/addPost', data ,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        })
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
    }
}


export const getBlog = async() => {
    try {
        const response = await axiosInstance.get('/getBlog',{
            headers : {
                'Authorization': token
            }
        })
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)

    }
}


export const showUserBlogs = async() => {
    try {
        console.log('ffff');
        
        const response = await axiosInstance.get('/userPosts' ,{
            headers : {
                'Authorization': token
            }
        })
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)

    }
}

export const getBlogData = async(id) => {
    try {
        console.log('ffff',id);
        
        const response = await axiosInstance.get('/blogData', {
            params : {id},
            headers : {
                'Authorization': token
            }   
        })
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}


export const deleteBlog = async(id) => {
    try {
        console.log('ffff',id);

        const response = await axiosInstance.delete('/deleteBlog', {
            params : {id},
            headers : {
                'Authorization': token
            }
        })
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}


export const editBlogPost = async (id, data) => {
    try {
        console.log('ffff',id);
    console.log('rrrrrr',data);
    
        
      const response = await axiosInstance.post('/editPost', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
        params: { id }, 
      });
      return response;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  