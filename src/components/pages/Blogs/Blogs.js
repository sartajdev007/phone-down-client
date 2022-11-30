import React from 'react';
import { Disclosure } from '@headlessui/react'
import { HiChevronUp } from "react-icons/hi"

const Blogs = () => {
    return (
        <div className="w-full px-4 py-16">
            <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-2">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>What are the different ways to manage a state in a React application?</span>
                                <HiChevronUp
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-emerald-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-start">
                                There are four main types of state you need to properly manage in React apps:
                                <ul>
                                    <li>Local state</li>
                                    <li>Global state</li>
                                    <li>Server state</li>
                                    <li>Server state</li>
                                </ul>
                                <p>useState is the first tool you should reach for to manage state in your components.</p>
                                <p>useReducer is another option that can be used for either local or global state. It is similar in many ways to useState under the hood, although instead of just an initial state it accepts a reducer</p>
                                <p>URL state is quite easy to manage, usually through custom hooks that give us all the information we need about our location, history, and pathname.
                                    If we are using React Router, you can get all the information you need using useHistory or useLocation.</p>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>How does prototypical inheritance work?</span>
                                <HiChevronUp
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-emerald-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-start">
                                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>What is a unit test? Why should we write unit tests?</span>
                                <HiChevronUp
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-emerald-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-start">
                                Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.

                                Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-emerald-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>Do you offer technical support?</span>
                                <HiChevronUp
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-emerald-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-start">
                                <div>
                                    <span className='text-semibold'>Angular:</span>Angular is built entirely in Typescript and every project on Angular is structured in modules, components and services. At least, each module must have a root module and a root component.
                                </div>
                                <div>
                                    <span className='text-semibold'>React:</span>React doesn’t propose a specific structure to be followed, and with only a few lines of code you can have a simple React application. we can identify two kinds of blocks inside a React project: Elements and Components. They are written in JSX, a syntax extension that allows you to create elements that contain HTML and JavaScript at the same time
                                </div>
                                <div>
                                    <span className='text-semibold'>Vue:</span>The structure in Vue.js is pretty simple. All pieces are meant to be self-contained, reusable components.Components in Vue.js are written in Single File Components (SFC) with the extension .vue. Inside these files, there are:
                                    The JavaScript logic,
                                    The HTML template (Vue.js has its own templates),
                                    The stylesheet in either CSS or SCSS
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
};

export default Blogs;