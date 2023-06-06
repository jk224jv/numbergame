'use client'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core'

export default function PipelineSlots() {
  useEffect(() => {
  enableButtons('wait')
  populateSlots()
  }, [])

  const enableButtons = (action) => {
    const spin = document.getElementById('spin')
    const stop = document.getElementById('stop')

    if (action === 'spin') {
      spin.disabled = false
      spin.classList.remove('bg-gray-500')
      spin.classList.add('bg-blue-500')
      spin.classList.add('animate-pulse')
      spin.classList.add('duration-300')

    } else if (action === 'wait') {
      spin.disabled = true
      stop.disabled = true

      spin.classList.remove('bg-blue-500')
      spin.classList.add('bg-gray-500')
      spin.classList.remove('animate-pulse')
      spin.classList.remove('duration-300')

      stop.classList.remove('bg-red-500')
      stop.classList.add('bg-gray-500')
      stop.classList.remove('animate-pulse')
      stop.classList.remove('duration-300')

    } else if (action === 'stop') {
      stop.disabled = false

      stop.classList.remove('bg-gray-500')
      stop.classList.add('bg-red-500')
      stop.classList.add('animate-pulse')
      stop.classList.add('duration-300')
    }
  }


  // poplulate each slot with 5 random pass/fail icons at equal intervals from the top of the slot window
  const populateSlots = () => {
    enableButtons('wait')
    enableButtons('stop')
    const result1 = document.getElementById('slot1-result')
    const result2 = document.getElementById('slot2-result')
    const result3 = document.getElementById('slot3-result')
    const result4 = document.getElementById('slot4-result')
    const result5 = document.getElementById('slot5-result')
    const results = [result1, result2, result3, result4, result5]
    results.forEach(result => {
      result.innerHTML = '&nbsp;'
    })

    const spin = document.getElementById('spin')
    const slot1 = document.getElementById('slot1-1')
    const slot2 = document.getElementById('slot2-1')
    const slot3 = document.getElementById('slot3-1')
    const slot4 = document.getElementById('slot4-1')
    const slot5 = document.getElementById('slot5-1')
    const slots = [slot1, slot2, slot3, slot4, slot5]
    slots.forEach(slot => {
      slot.innerHTML = ''
      const rotationSpeed = Math.random() * 1 + .5 // Random rotation speed between 5 and 15 (adjust as desired)
      slot.style.animationDuration = `${rotationSpeed}s`
      for (let i = 0; i < 6; i++) {
        const icon = i % 2 ? 'pass' : 'fail'
        let iconClone = document.querySelector(`#${icon}`).cloneNode(true)
        iconClone.classList.add('relative', `${icon}`, 'sloticon', 'border-t-2', 'border-b-2','mt-20' ,'border-solid', 'border-slate-400', 'shadow')
        iconClone.style.animation = `iconFall ${rotationSpeed}s linear infinite`

        slot.appendChild(iconClone)
      }
    })
  }

  const stopSlots = () => {
    enableButtons('wait')
    const slot1 = document.getElementById('slot1-1')
    const slot2 = document.getElementById('slot2-1')
    const slot3 = document.getElementById('slot3-1')
    const slot4 = document.getElementById('slot4-1')
    const slot5 = document.getElementById('slot5-1')
    const slots = [slot1, slot2, slot3, slot4, slot5]
    slots.forEach(slot => {
      // set a random stop time between 1 and 4.5 seconds
      const stopTime = Math.random() * 3.5 + 1
      setTimeout((slot) => {
        slot.querySelectorAll('.sloticon').forEach(icon => {
          icon.style.animationPlayState = 'paused'
        })
      }, stopTime * 1000, slot)
    })
    setTimeout(() => {
      getResults()
    }, 5000)
  }

  const getResults = () => {
    const slot1 = document.getElementById('slot1-1')
    const slot2 = document.getElementById('slot2-1')
    const slot3 = document.getElementById('slot3-1')
    const slot4 = document.getElementById('slot4-1')
    const slot5 = document.getElementById('slot5-1')
    const slots = [slot1, slot2, slot3, slot4, slot5]
    // Fin the icon that is closest to the middle of the slot window
    const slot1Icons = slot1.querySelectorAll('.sloticon')
    const slot2Icons = slot2.querySelectorAll('.sloticon')
    const slot3Icons = slot3.querySelectorAll('.sloticon')
    const slot4Icons = slot4.querySelectorAll('.sloticon')
    const slot5Icons = slot5.querySelectorAll('.sloticon')


    const results = []
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i]
      const slotCenter = slot.offsetHeight / 2;
      const iconElements = slot.querySelectorAll('.sloticon')
      let closest = Infinity
      let closestIcon = null
      for(const iconEl of iconElements) {
        const iconPosition = iconEl.offsetTop + iconEl.offsetHeight / 2; // Calculate the vertical center of the icon
        const distance = Math.abs(slotCenter - iconPosition);
        if (distance < closest) {
          closest = distance
          closestIcon = iconEl
        }
      }
      const result = closestIcon.id === 'pass' ? 'pass' : 'fail'
      results.push(result)
    }
    for (let i = 0; i < slots.length; i++) {
      const div = `slot${i + 1}-result`
      document.getElementById(div).innerHTML = ''
      let iconClone = document.querySelector(`#${results[i]}`).cloneNode(true)
      iconClone.style.animation = ''
      iconClone.style.animationPlayState = 'paused'
      document.getElementById(div).appendChild(iconClone)
    }
    enableButtons('spin')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start lg:justify-center gap-y-10 p-24">
      <div className="flex flex-row items-center justify-center">
        <div id="pass" className='flex flex-col h-20 w-20 md:w-32 lg:w-44 animate-pulse duration-1000'><FontAwesomeIcon icon={faCheck} className="border-box text-green-500 border-8 object-contain h-16 w-16 mx-auto border-solid border-green-500 rounded-full" /></div>
        <h1 className="sm:text-2xl lg:text-4xl font-bold text-center" >Pipeline slots</h1>
        <div id="fail" className='flex flex-col h-20 w-20 md:w-32 lg:w-44  animate-pulse'><FontAwesomeIcon icon={faCircleXmark} className='text-red-500 h-full w-full mx-auto'/></div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-2xl font-bold text-center">Build</h2>
          <div className="flex flex-col slot-container items-center justify-center w-16 sm:w-20 md:w-32 lg:w-44 h-80 bg-amber-300 border-4 border-slate-400 border-solid sm:mr-1 p-1 sm:p-3" id="slot1">
            <div className='relative overflow-hidden flex flex-col items-center justify-center h-full w-full bg-slate-50 border-slate-400 border-solid border-2 shadow' id="slot1-1">
            </div>
          </div>
          <div id="slot1-result" className='flex flex-col h-18 sm:h-20 w-18 sm:w-20 md:w-32 lg:w-44 mt-5'>&nbsp;</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-2xl font-bold text-center">Lint</h2>
          <div className="flex flex-col slot-container items-center justify-center w-16 sm:w-20 md:w-32 lg:w-44 h-80 bg-amber-300 border-4 border-slate-400 border-solid sm:mr-1 p-1 sm:p-3" id="slot2">
            <div className='relative overflow-hidden flex flex-col items-center justify-center h-full w-full bg-slate-50 border-slate-400 border-solid border-2 shadow' id="slot2-1">
            </div>
          </div>
          <div id="slot2-result" className='flex flex-col h-18 sm:h-20 w-18 sm:w-20 md:w-32 lg:w-44 mt-5'>&nbsp;</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-2xl font-bold text-center">Test</h2>
          <div className="flex flex-col slot-container items-center justify-center w-16 sm:w-20 md:w-32 lg:w-44 h-80 bg-amber-300 border-4 border-slate-400 border-solid sm:mr-1 p-1 sm:p-3" id="slot3">
            <div className='relative overflow-hidden flex flex-col items-center justify-center h-full w-full bg-slate-50 border-slate-400 border-solid border-2 shadow' id="slot3-1">
            </div>
          </div>
          <div id="slot3-result" className='flex flex-col h-18 sm:h-20 w-18 sm:w-20 md:w-32 lg:w-44 mt-5'>&nbsp;</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-2xl font-bold text-center">Docker</h2>
          <div className="flex flex-col slot-container items-center justify-center w-16 sm:w-20 md:w-32 lg:w-44 h-80 bg-amber-300 border-4 border-slate-400 border-solid sm:mr-1 p-1 sm:p-3" id="slot4">
            <div className='relative overflow-hidden flex flex-col items-center justify-center h-full w-full bg-slate-50 border-slate-400 border-solid border-2 shadow' id="slot4-1">
            </div>
          </div>
          <div id="slot4-result" className='flex flex-col h-18 sm:h-20 w-18 sm:w-20 md:w-32 lg:w-44 mt-5'>&nbsp;</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-sm sm:text-2xl font-bold text-center">Deploy</h2>
          <div className="flex flex-col slot-container items-center justify-center w-16 sm:w-20 md:w-32 lg:w-44 h-80 bg-amber-300 border-4 border-slate-400 border-solid sm:mr-1 p-1 sm:p-3" id="slot5">
            <div className='relative flex flex-col overflow-hidden items-center justify-center h-full w-full bg-slate-50 border-slate-400 border-solid border-2 shadow' id="slot5-1">
            </div>
          </div>
          <div id="slot5-result" className='flex flex-col h-18 sm:h-20 w-18 sm:w-20 md:w-32 lg:w-44 mt-5'>&nbsp;</div>
        </div>
        {/* end of slots  */}
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row gap-5 sm:gap-10 items-center justify-center">
          <button className="bg-red-500 text-white font-bold py-8 px-16 rounded" id="stop" onClick={stopSlots}>Stop</button>
          <button className="bg-blue-500 text-white font-bold py-8 px-16 rounded" id="spin" onClick={populateSlots}>Spin</button>
        </div>
      </div>
      <p className=''>This is a small project by Jimmy Karlsson, Codesmith junior-grade, in training at Linnaeus University.</p>
      <p className=''>The source code is available on <a href="https://github.com/jk224jv/pipelineslots"><span className='text-sky-500 font-semi-bold italic underline cursor-pointer'>https://github.com/jk224jv/pipelineslots</span></a></p>
    </main>
  )
}
