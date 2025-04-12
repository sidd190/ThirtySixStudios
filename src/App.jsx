import React, { useEffect, useRef, useState } from 'react'
import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function App() {
  const growingspan = useRef(null);
  const [showCanvas,setShowCanvas]=useState(false);
  const headingref = useRef(null);
  useEffect (()=>{
    const handleclick = (e)=>{
      setShowCanvas((prevShowCanvas)=>{
        if(!prevShowCanvas){
          gsap.set(growingspan.current,{
            top:e.clientY,
            left:e.clientX,
          });
          gsap.to("body",{
            color:"#000",
            backgroundColor:"pink",
            duration:1,
            ease: "power2.inOut",
          });
          gsap.to(growingspan.current,{
            scale:1000,
            duration:2,
            ease:'power2.inOut',
            onComplete:()=>{
                gsap.set(growingspan.current,{
                  scale:0,
                  clearProps:"all",
                })
            }
          });
        }
        else{
          gsap.to("body",{
            color:"#fff",
            backgroundColor:"#000",
            duration:1.2,
            ease:"power2.inOut"
          })
        }
        return !prevShowCanvas;
    });
  }
  const headingelem = headingref.current;
  headingelem.addEventListener("click",handleclick);
  return ()=> headingelem.removeEventListener("click",handleclick);
  },[]);
  useEffect (()=>{
    const locomotiveScroll = new LocomotiveScroll();
  },[]);
  return (
    <>
      <span ref={growingspan} className='growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5 bg-[pink] '></span>
      <div className="w-full relative min-h-screen">
        {showCanvas && data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1 ref={headingref} className="text-[17rem] font-normal tracking-tight leading-none pl-5">
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App