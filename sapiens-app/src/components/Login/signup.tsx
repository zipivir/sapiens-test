import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

type SignupComponentProps = {
  StaticUsersApi: string;
  StaticSignupApi: string;
};

const SignupComponent = (props: SignupComponentProps) => {
//   const emailRegex = /\S+@\S+\.\S+/;
//   const router = useRouter();
//   const name = useRef("");
//   const email = useRef("");
//   const password = useRef("");
//   const passwordConfirm = useRef("");
//   const [isPasswordNotConfirm, setIsPasswordNotConfirm] = useState(true);
//   const [isFormNotComplete, setIsFormNotComplete] = useState(true);
//   const [isMailNotValid, setIsMailNotValid] = useState(true);
//   const [isUserExist, setIsUserExist] = useState(false);
//   const [isValidationTriggered, setIsValidationTriggered] = useState(false);

//   const checkUserIfExist = async () => {
//     try {
//       const userData = {
//         name: name.current,
//         email: email.current,
//         password: password.current,
//       };
  
//       console.log(`Checking if user ${email.current} exists.`, { userEmail: email.current });
  
//       const userRes = await fetch(props.StaticSignupApi, {
//         method: "POST",
//         body: JSON.stringify({ userData }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       console.log(`Response status for user check: ${userRes.status}`, { userEmail: email.current, status: userRes.status });
//       return userRes.status === 422;
//     } catch (error) {
//       console.error(`Error checking if user exists: ${error}`, { userEmail: email.current, error: error });
//       return true;
//     }
//   };
  
//   const addUser = async (userData: any) => {
//     try {
//       console.log(`Adding new user ${userData.email}`, { userEmail: userData.email });
  
//       const userRes = await fetch(props.StaticUsersApi, {
//         method: "POST",
//         body: JSON.stringify({ userData }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       console.log(`Response status for adding user: ${userRes.status}`, { userEmail: userData.email, status: userRes.status });
//       if (userRes.status !== 200 && userRes.status !== 201) {
//         return false;
//       }
  
//       console.log("User is added successfully", { userEmail: userData.email });
//       return true;
//     } catch (error) {
//       console.error(`Error adding user: ${error}`, { userEmail: userData.email, error: error });
//       return false;
//     }
//   };
  
//   const handleSignup = async (event: any) => {
//     setIsValidationTriggered(true);

//     if (!name.current || !email.current || !password.current) {
//       setIsFormNotComplete(true);
//       return;
//     }
//     setIsFormNotComplete(false);

//     if (!emailRegex.test(email.current)) {
//       setIsMailNotValid(true);
//       return;
//     }
//     setIsMailNotValid(false);

//     if (password.current !== passwordConfirm.current) {
//       setIsPasswordNotConfirm(true);
//       return;
//     }
//     setIsPasswordNotConfirm(false);

//     const userExists = await checkUserIfExist();
//     setIsUserExist(userExists);

//     if (userExists) return;

//     const userData = {
//       name: name.current,
//       email: email.current,
//       password: password.current,
//     };

//     const addUserResponse = await addUser(userData);
//     if (addUserResponse) {
//       router.push("/#login");
//     }
//   };

//   return (
//     <Styled.FlexContainer>
//       <Styled.Container>
//         <Styled.LoginTitle>Sign up</Styled.LoginTitle>
//         <Styled.FormGroup>
//           <Styled.FormLabel htmlFor="name">Name</Styled.FormLabel>
//           <Styled.FormInput
//             type="text"
//             id="name"
//             autoFocus
//             onChange={(e: Event) => {
//               setIsValidationTriggered(false), (name = e.target);
//             }}
//           />

//           <Styled.FormLabel htmlFor="email">Email address</Styled.FormLabel>
//           <Styled.FormInput
//             type="email"
//             id="email"
//             autoFocus
//             onChange={(e: Event) => {
//               setIsValidationTriggered(false),
//                 // setIsUserExist(false),
//                 setIsMailNotValid(false),
//                 setIsUserExist(false),
//                 (email.current = e.target.value);
//             }}
//           />
//           {isValidationTriggered && isMailNotValid && (
//             <Styled.ErrorMassage>Email is invalid</Styled.ErrorMassage>
//           )}
//           <Styled.FormLabel htmlFor="password">Password</Styled.FormLabel>
//           <Styled.FormInput
//             type="password"
//             id="password"
//             onChange={(e) => {
//               setIsValidationTriggered(false);
//               setIsPasswordNotConfirm(false),
//                 (password.current = e.target.value);
//             }}
//           />
//           <Styled.FormLabel htmlFor="passwordConfirm">Confirm your password</Styled.FormLabel>
//           <Styled.FormInput
//             type="password"
//             id="passwordConfirm"
//             onChange={(e) => {
//               setIsValidationTriggered(false);
//               setIsPasswordNotConfirm(false),
//                 (passwordConfirm.current = e.target.value);
//             }}
//           />
//           {isValidationTriggered && isPasswordNotConfirm && (
//             <Styled.ErrorMassage>The passwords do not match</Styled.ErrorMassage>
//           )}
//           {isValidationTriggered && isFormNotComplete && (
//             <Styled.ErrorMassage>Some information is missing </Styled.ErrorMassage>
//           )}
//           {isUserExist && isValidationTriggered && (
//             <Styled.ErrorMassage>user {email.current} is already exist</Styled.ErrorMassage>
//           )}
//         </Styled.FormGroup>
//         <Styled.LoginFormButton type="button" onClick={handleSignup}>
//           Let's start
//         </Styled.LoginFormButton>
//       </Styled.Container>
//     </Styled.FlexContainer>
//   );
}

export default SignupComponent;