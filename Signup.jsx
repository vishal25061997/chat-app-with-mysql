// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import { useState } from "react";

// const Signup = () => {
//   const [show, setShow] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [pic, setPic] = useState("");
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   const handleClick = () => setShow(!show);

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!name || !email || !password) {
//       toast({
//         title: "Please Fill all the Fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
//     try {
//       const data = JSON.stringify({
//         name,
//         email,
//         password,
//         pic,
//       });

//       const response = await fetch("http://localhost:5000/api/user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: data,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//       }

//       const responseData = await response.json();
//       console.log(responseData);
//       toast({
//         title: "Registration Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(responseData));
//       setLoading(false);
//       redirectTo("/chats"); // Redirection after successful registration
//     } catch (error) {
//       toast({
//         title: "Error Occurred!",
//         description: error.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   const redirectTo = (path) => {
//     window.location.href = path;
//   };

//   const postDetails = (pics) => {
//     setLoading(true);
//     if (!pics) {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "chat-app");
//       data.append("cloud_name", "piyushproj");
//       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//         method: "POST",
//         body: data,
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Image upload failed");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           // toast({
//           //   title: "Image Upload Failed",
//           //   status: "error",
//           //   duration: 5000,
//           //   isClosable: true,
//           //   position: "bottom",
//           // });
//           setLoading(false);
//         });
//     } else {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
//   };

//   return (
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="email" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           type="email"
//           placeholder="Enter Your Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="pic">
//         <FormLabel>Upload your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default Signup;
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          pic,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message || "Failed to register user",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
