import Image from 'next/image'
import LogoWhite from "@/assets/img/logo-white.svg";
import Anpc from "@/assets/img/anpc.png";
import Litigi from "@/assets/img/litigi.png";
import React from "react";

export default function Footer() {

  return (

      <header className="bg-secondary py-10">
          <div className="container mx-auto">
              <div className="block md:grid grid-cols-3">
                  <div className="mb-5">
                      <Image className="mx-auto md:mx-0" width={180} src={LogoWhite} alt="Ajandekok.ro | Logo"/>
                      <div className="flex items-center justify-center md:justify-start mt-5">
                          <a href="https://www.facebook.com/kolpicshop">
                              <div className="bg-secondary hover:bg-white rounded-full transition-all duration-300 mr-2">
                                  <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 21V13.0001M12 13.0001V10.0001C12 8.02404 13.3537 7.03622 15.5 7.18462M12 13.0001L15 13.0001M12 13.0001H9" stroke="#CE311A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                              </div>
                          </a>

                          <a href="https://www.instagram.com/kolpic_shop/">
                              <div className="bg-secondary hover:bg-white rounded-md transition-all duration-300 mr-2">
                                  <svg fill="#CE311A" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 48 48">
                                      <title>instagram</title>
                                      <g id="Layer_2" data-name="Layer 2">
                                          <g id="invisible_box" data-name="invisible box">
                                              <rect width="48" height="48" fill="none"/>
                                              <rect width="48" height="48" fill="none"/>
                                          </g>
                                          <g id="icons_Q2" data-name="icons Q2">
                                              <path d="M24,7.6h8.1a10.8,10.8,0,0,1,3.7.7,6.7,6.7,0,0,1,3.8,3.8,10.8,10.8,0,0,1,.7,3.7c.1,2.1.1,2.8.1,8.1s0,6-.1,8.1a10.8,10.8,0,0,1-.7,3.7,6.7,6.7,0,0,1-3.8,3.8,10.8,10.8,0,0,1-3.7.7H15.9a10.8,10.8,0,0,1-3.7-.7,6.7,6.7,0,0,1-3.8-3.8,10.8,10.8,0,0,1-.7-3.7c-.1-2.1-.1-2.8-.1-8.1s0-6,.1-8.1a10.8,10.8,0,0,1,.7-3.7,6.7,6.7,0,0,1,3.8-3.8,10.8,10.8,0,0,1,3.7-.7H24M24,4H15.8a17.9,17.9,0,0,0-4.9.9A10,10,0,0,0,7.4,7.4a8.5,8.5,0,0,0-2.3,3.5,14.5,14.5,0,0,0-1,4.9C4,17.9,4,18.6,4,24s0,6.1.1,8.2a14.5,14.5,0,0,0,1,4.9,8.5,8.5,0,0,0,2.3,3.5,8.5,8.5,0,0,0,3.5,2.3,14.5,14.5,0,0,0,4.9,1H32.2a14.5,14.5,0,0,0,4.9-1,8.5,8.5,0,0,0,3.5-2.3A10,10,0,0,0,43,37.1a17.9,17.9,0,0,0,.9-4.9c.1-2.1.1-2.8.1-8.2s0-6.1-.1-8.2a17.9,17.9,0,0,0-.9-4.9,10,10,0,0,0-2.4-3.5A10,10,0,0,0,37.1,5a17.9,17.9,0,0,0-4.9-.9H24"/>
                                              <path d="M24,13.7A10.3,10.3,0,1,0,34.3,24,10.3,10.3,0,0,0,24,13.7m0,17A6.7,6.7,0,1,1,30.7,24,6.7,6.7,0,0,1,24,30.7"/>
                                              <path d="M37.1,13.3a2.4,2.4,0,1,1-2.4-2.4,2.4,2.4,0,0,1,2.4,2.4"/>
                                          </g>
                                      </g>
                                  </svg>
                              </div>
                          </a>
                          <a href="https://linktr.ee/kolpic">
                              <div className="bg-secondary hover:bg-white rounded-md transition-all duration-300 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#CE311A" width="30px" height="30px" viewBox="0 0 24 24" role="img"><path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.89h1.294v4.776c0 .486-.404.89-.89.89H6.577a.898.898 0 0 1-.889-.891v-4.774H.992c-.728 0-1.214-.729-.89-1.377l6.96-12.627a1.065 1.065 0 0 1 1.863 0l2.913 5.585-3.885 7.042zm15.945 0-6.96-12.627a1.065 1.065 0 0 0-1.862 0l-2.995 5.586 3.885 7.04c.081.164.081.326.081.487-.08.517-.529.897-1.052.89h-1.296v4.776c.005.49.4.887.89.89h2.914a.9.9 0 0 0 .892-.89v-4.775h4.612c.73 0 1.214-.729.89-1.377z"/></svg>
                              </div>
                          </a>
                      </div>
                  </div>

                  <div className="text-center">
                      <a className="block text-background text-sm mb-2" href="https://www.ajandekok.ro/rolunk">Tudj meg többet rólunk</a>
                      <a className="block text-background text-sm mb-2" href="https://ajandekok.ro/termeni-si-conditii/">Általános Szerződési Feltételek</a>
                      <a className="block text-background text-sm mb-2" href="https://ajandekok.ro/politica-de-confidentialitate/">Adatkezelési tájékoztató</a>
                      <a className="block text-background text-sm mb-2" href="Garancia">Garancia</a>
                      <span className="text-primary text-sm text-center">@copyright 2023. All rights reserved</span>
                  </div>

                  <div className="text-center md:text-right flex flex-col items-center md:items-end mt-2 md:mt-0">
                      <a href="https://anpc.ro/ce-este-sal/" className="mb-5 block">
                          <Image width={180} src={Anpc} alt="Ajandekok.ro | ANPC"/>
                      </a>
                      <a href="https://ec.europa.eu/consumers/odr" className="block">
                          <Image width={180} src={Litigi} alt="Ajandekok.ro | Protectia Consumatorilui"/>
                      </a>
                  </div>

              </div>
          </div>
      </header>
  )
}
