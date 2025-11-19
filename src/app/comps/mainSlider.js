'use client'

import React, { useState, useEffect } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image'
import { Theme } from "../local" // Assuming Theme is defined here

export default (props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver || !isPlaying) return;
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  useEffect(() => {
    if (instanceRef.current) {
      if (isPlaying) {
        instanceRef.current.emit('updated');
      } else {
        instanceRef.current.emit('dragStarted');
      }
    }
  }, [isPlaying, instanceRef]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="rounded-2xl lg:h-[480px] h-72 lg:mt-0 mt-0 relative overflow-hidden" style={{ width: "100%" }}>
      <div style={{ width: "100%", height: "100%" }} className="navigation-wrapper">
        <div style={{ width: "100%", height: "100%" }} ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden">
          {props.slides && props.slides.map((img) => (
            <div key={img} className="keen-slider__slide lg:h-[480px] h-72 w-full">
              <Image
                priority={true}
                fill
                objectFit='cover'
                src={img}
                className="rounded-2xl"
                alt="Slider Image"
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0 && !instanceRef.current.options.loop}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1 && !instanceRef.current.options.loop
              }
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
        <>
          <div className="dots absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={`
                    dot
                    h-2 rounded-full transition-all duration-300 ease-out
                    ${currentSlide === idx ? 'w-8' : 'w-2'} // Active dot is wider (w-8), inactive is standard (w-2)
                  `}
                  style={{
                    backgroundColor: currentSlide === idx ? "white" : "#white", 
                  }}
                ></button>
              )
            })}
          </div>


        </>
      )}
    </div>
  )
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  const [isHovered, setIsHovered] = useState(false);

  const arrowContainerClasses = `
    absolute top-1/2 -translate-y-1/2
    flex items-center justify-center
    lg:w-[84px] lg:h-[420px] h-60
    px-6 py-0
    pointer-events-auto
    z-10
    group
    transition-all duration-300 ease-in-out
    ${props.left ? "left-0" : "right-0"}
    ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  const gradientStyle = props.left
    ? 'linear-gradient(90deg, rgba(67, 17, 13, 0.48) 0%, rgba(224, 36, 36, 0) 100%)'
    : 'linear-gradient(270deg, rgba(67, 17, 13, 0.48) 0%, rgba(224, 36, 36, 0) 100%)';

  return (
    <div
      onClick={props.onClick}
      className={arrowContainerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered && !props.disabled ? gradientStyle : 'transparent',
        filter: isHovered && !props.disabled ? 'blur(0.5px)' : 'none',
        opacity: props.disabled ? '0.5' : (isHovered ? '1' : '0.25')
      }}
    >
      <svg
        fill="white"
        className={`w-6 h-6 transition-transform duration-300 ${props.disabled ? '' : 'group-hover:scale-125'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    </div>
  )
}