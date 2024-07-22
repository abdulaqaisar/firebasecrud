import React, { useState, useEffect } from "react";
import { fireDb, imageDb } from "../firebase";
import { getDownloadURL, ref as ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { set , ref as dbref, onValue } from "firebase/database";
const Storeimagetext = () => {
  const [image, setImage] = useState("");
  const [data,setData]=useState('');

  const upload = async () => {
    try {
      const imgRef = ref(imageDb, `${image.name}`);
      await uploadBytes(imgRef, image);

      const uploadedImageUrl = await getDownloadURL(imgRef);
      toast.success("Image Uploaded and URL Stored URL:", uploadedImageUrl);
      console.log("Image Uploaded and URL Stored URL:", uploadedImageUrl);

      const userImageRef = dbref(fireDb, `users/${88}/profileImage`);
      await set(userImageRef, uploadedImageUrl);
    } catch (error) {
      toast.error("Error uploading image and storing URL:", error);
    }
  };


  useEffect(() => {
    let getdata = async () => {
      const starCountRef = dbref(fireDb, `users/${88}`);
      onValue(starCountRef, async (snapshot) => {
        let fetchdata = await snapshot.val();
        console.log(fetchdata);
        setData(fetchdata);
      });   
    };
    getdata();
  }, []);

  return (
    <>
      <div className="storeimage">
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={upload}> Upload </button>
      </div>
      <div style={{width:"10%" , height:"23vh" , margin:"50px" }}>
      <img src={data.profileImage} alt="" style={{width:"100%"}} />  
      </div>  
      </>
  );
};

export default Storeimagetext;
