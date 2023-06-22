import { React, useEffect, useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import {AiOutlineGooglePlus} from 'react-icons/ai';
import {FaFacebookF} from 'react-icons/fa';


function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const onError=(eror)=>{
    const {errors} = eror?.response?.data||{}
      if(errors){
        errors.forEach(err=>{
          setError(err.path, {
            type: "manual",
            message:err.msg,
          });
        })
      }
  }
  const onSubmit = async(data) => {

      console.log(data)
      try{
       const resp =  await axios.post(`http://localhost:4000/api/auth/register`,data).then((res)=>{
        localStorage.setItem('userData', JSON.stringify(res.data));
        setUserData(res.data);
        navigate('/home', { replace: true }, res.data)
      })
      }
      catch (error)
{
onError(error)
}    
      
     /// alertify.success('Successfully Login');     
     
  }
console.log(errors,"erros")
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Create Account</p>
                  <button type="button" className=" social-icon btn-floating mx-1">
                  <AiOutlineGooglePlus/>
                  </button>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                  <FaFacebookF/>
                  </button>
                </div>
            <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">OR</p>
                </div>
              <form onSubmit={handleSubmit(onSubmit,onError)}>
                <div className="form-outline mb-3">

                  <input id="inputEmail" type="text" placeholder="Full Name" autofocus="" class="form-control border-0 shadow-sm px-4"
                    {...register("username", { required: "Full name  is required" })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username && <p className="valid-txt">{errors.username?.message}</p>}

                </div>
                {/* Email input */}
                <div className="form-outline mb-3">

                  <input id="inputEmail" type="email" placeholder="Email address" autofocus="" class="form-control border-0 shadow-sm px-4" {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="valid-txt">{errors.email?.message}</p>}

                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <input id="inputPassword" type="password" placeholder="Password" class="form-control  border-0 shadow-sm px-4 text-primary"
                    {...register("password", { required: "Password is required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password && <p className="valid-txt">{errors.password?.message}</p>}

                </div>
                <div className="d-flex justify-content-between align-items-center">
                
                  
                </div>
                <div className="text-center text-lg-start mt-4 pt-2 ">
                  <button
                   type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem"}}
                   
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <a href="#!" className="link-danger">
                      Login
                    </a>
                  </p>
                </div>
               
               

              </form>
            </div>
          </div>
        </div>
       
      </section>


    </>
  )
}


export default Register