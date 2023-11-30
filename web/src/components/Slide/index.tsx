'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'

import { SlideItem } from './SlideItem'
import { SlideDot } from './SlideDot'

import 'keen-slider/keen-slider.min.css'

export function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 5000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  return (
    <div ref={sliderRef} className="keen-slider relative overflow-hidden">
      <SlideItem
        imageUrl="https://i.imgur.com/bkMgcFb.png"
        description="Tá decidido: Jogadores da T1 revelam campeões do LoL que receberão suas skins"
      />
      <SlideItem
        imageUrl="https://i.imgur.com/jSknmIm.png"
        description="Lethal Company, um terror com comédia que se tornou um sucesso!"
      />
      <SlideItem
        imageUrl="https://i.imgur.com/oxO0bIl.png"
        description="Quantas horas de jogo tem Baldur’s Gate 3?"
      />

      {loaded && instanceRef.current && (
        <div className="dots z-2 absolute bottom-4 right-4 flex gap-4">
          {Array.from(
            Array(instanceRef.current.track.details.slides.length).keys(),
          ).map((idx) => {
            return (
              <SlideDot
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                isActive={currentSlide === idx}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
