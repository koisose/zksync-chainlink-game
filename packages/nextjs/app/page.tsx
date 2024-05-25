"use client";

import {generateGuessingGame} from './actions'
import type { NextPage } from "next";
import { useAccount } from "wagmi";

import { Address } from "~~/components/scaffold-eth";
import { useState,Fragment  } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGuess, setIsOpenGuess] = useState(false);
  const [word, setWord] = useState({word:"",clue:""});
  const [loading, setLoading] = useState(false);
  function closeModalGuess() {
    setIsOpenGuess(false);
  }

  function openModalGuess() {
    setIsOpenGuess(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Manta Guessing game</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <p className="text-center text-lg">
            This game is a guessing game every ai generated game is saved onchain if you win, you win a manta native token

          </p>
        </div>


        <div className="flex-grow bg-base-300 w-full mt-16 px-8">
   
            <div className="flex items-center flex-col flex-grow ">
             
              <div className="flex-grow bg-base-300 w-full  px-8 py-5">
                <h1 className="text-6xl font-bold text-center">Explore</h1>
                <div className="flex justify-center items-center mt-4">
                  <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-5"
                  >
                    Create Game
                  </button>
                </div>
                <div className="border rounded-lg p-4 mt-8 inline-block bg-white text-black">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Card Title</h2>
                    <p className="mt-2 text-gray-600">Card description goes here.</p>
                    <div className="flex justify-center items-center space-x-2">
                      <span>by</span>
                      <Address address={connectedAddress} />
                    </div>
                  <div className="flex justify-center items-center mt-4 space-x-1 bg-gray-200 p-1 rounded-full">
                   <span>prize</span>
                    <img
                      src="https://assets.coingecko.com/coins/images/34289/standard/manta.jpg?1704468717"
                      alt="Avatar"
                      className="w-5 h-5 rounded-full"
                    />
                    <p className="text-xs font-medium">0,0001</p>
                  </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="button"
                      onClick={openModalGuess}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Guess
                    </button>
                  </div>
                </div>
                <Transition appear show={isOpenGuess} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={closeModalGuess}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-black"
                            >
                              Make a Guess
                            </Dialog.Title>
                            <div className="mt-4">
                              <input
                                type="text"
                                className="w-full px-4 py-2 border border-black rounded-md text-black bg-white"
                                placeholder="Enter your guess"
                              />
                              <div className="flex justify-center mt-4">
                                <button
                                  type="button"
                                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                  Guess
                                </button>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Create a New Game
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                               click on generate game to create game, we are using gemini ai to create the word to guess randomly,
                               then you need to pay manta native gas token to create game anybody who can guess the word, will get 
                               that manta native token
                              </p>
                            </div>
                            <div className="mt-4">
                            <div className="flex justify-center my-4">
                                
                             
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={async () => {
                                  setLoading(true);
                                  const wordAndClue = await generateGuessingGame();
                                  setWord(JSON.parse(wordAndClue));
                                  setLoading(false);
                                }}
                                disabled={loading}
                              >
                                {loading ? (
                                  <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                  </svg>
                                ) : (
                                  "Generate game"
                                )}
                              </button>
                              </div>
                              {word.word!=="" && <div className="flex justify-center my-4">
                                <div className="rounded-lg bg-gray-200 p-4">
                                  <p className="text-gray-700 text-center font-bold">
                                   Generated word:
                                  </p>
                                  <p className="text-gray-700 text-center">
                                  {word.word}
                                  </p>
                                </div>
                              </div>}
                              {word.clue !=="" &&<div className="rounded-lg bg-gray-200 p-4">
                              <p className="text-gray-700 text-center font-bold">
                                   Clue:
                                  </p>
                                <p className="text-gray-700">
                                  {word.clue}
                                </p>
                              </div>}
                            {word.word!==""&&<div className="mt-4">
                            <p className="text-gray-700">
                                  How much manta you want to put in this game:
                                </p>
                              <input
                                type="number"
                                className="w-full rounded-md bg-white p-2 text-gray-700 border border-black"
                                placeholder="eth"
                              />
                            </div>}
                            {word.word!==""&&<div className="flex justify-center my-4">
                                
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  disabled={loading}
                                >
                                  Create game
                                </button>
                              </div>}
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
       


        </div>
      </div>
    </>
  );
};

export default Home;
