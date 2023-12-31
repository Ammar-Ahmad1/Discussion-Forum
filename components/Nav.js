"use client";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";
// import {toast, ToastContainer} from "react-toastify";

const Nav = ({ toast }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleRegisterModal, setToggleRegisterModal] = useState(false);
  const [Pid, setPid] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleOpenModal = (providerId) => {
    setToggleModal(true);
    setPid(providerId);
  };

  const handleCloseModal = () => {
    setToggleModal(false);
  };
  const handleCloseRegisterModal = () => {
    setToggleRegisterModal(false);
  };

  const signoutt = async () => {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
      });
      toast.success("Logout Successfull");
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      {/* <ToastContainesr /> */}
      <Link href="/" className="flex gap-2 flex-center">
        <img
          height="40px"
          width="195px"
          src="./assets/media/logo.svg"
          alt="ZINDABHAG logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div className="sm:flex hidden">
           
                <button
                  type="button"
                  
                  onClick={() => {
                    // handleLoginClick(provider.id);
                    handleOpenModal();
                    // signIn(provider.id).then((res) => {
                    //   console.log(res);
                    //   if (res) {
                    //     toast.success("Login Successfull");
                    //   }
                    // });
                  }}
                  className="flex gap-3 md:gap-5 black_btn sm:mr-5"
                >
                  Sign in
                </button>
             
            {`  `}
            
             
                <button
                  type="button"
                  
                  onClick={() => {
                    router.push("/register");
                  }}
                  className="outline_btn"
                >
                  Register
                </button>
              
            {toggleModal && (
              <LoginModal
                signIn={signIn}
                provider={Pid}
                onCloseModal={handleCloseModal}
              />
            )}
            {toggleRegisterModal && (
              <RegisterModal onCloseModal={handleCloseRegisterModal} />
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signoutt();
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            
                <button
                  type="button"
                  
                  onClick={() => {
                    // handleLoginClick(provider.id);
                    // signIn(provider.id);
                    handleOpenModal();
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              
            {`  `}

                <button
                  type="button"
                 
                  onClick={() => {
                    router.push("/register");
                  }}
                  className="outline_btn"
                >
                  Register
                </button>
             
            {toggleModal && (
              <LoginModal
                signIn={signIn} // Pass the signIn function from NextAuth
                provider={Pid} // Pass the provider id for your desired provider
                onCloseModal={handleCloseModal} // Pass the onCloseModal function to close the modal
                // onEmailChange={handleEmailChange} // Implement your email change handler
                // onPasswordChange={handlePasswordChange} // Implement your password change handler
              />
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
