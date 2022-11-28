import React from 'react';

const Blog = () => {

    return (
        <section className="border my-10 shadow-md">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
                    <details>
                        <summary className="py-2 outline-none cursor-pointer"> What are the different ways to manage a state in a React application?</summary>
                        <div className="px-4 pb-4">
                            <p>The Four Kinds of React State to Manage</p>
                            <ul>
                                <li className="mb-4">Local state</li>
                                <li className="mb-4">Global state</li>
                                <li className="mb-4">Server state</li>
                                <li className="mb-4">URL state</li>
                            </ul>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer">How does prototypical inheritance work?</summary>
                        <div className="px-4 pb-4">
                            <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer">What is a unit test? Why should we write unit tests?</summary>
                        <div className="px-4 pb-4 space-y-2">
                            <p>Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.</p> <br />
                            <p>Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                                It simplifies the debugging process.
                                Unit testing is an integral part of extreme programming.</p>
                        </div>
                    </details>
                    <details>
                        <summary className="py-2 outline-none cursor-pointer">React vs. Angular vs. Vue?</summary>
                        <div className="px-4 pb-4 space-y-2">
                            <div>
                                <h1 className='text-3xl font-semibold text-center'>React</h1>
                                <p>React can be used as a UI library to render elements, without enforcing a specific project structure, and that’s why it’s not strictly a framework.
                                    <br />
                                    React Elements are the smallest building blocks of React apps. They are more powerful than DOM elements because the React DOM makes sure to update them efficiently whenever something changes.
                                    <br />
                                    Components are larger building blocks that define independent and reusable pieces to be used throughout the application. They accept inputs called props and produce elements that are then displayed to the user.
                                    <br />
                                    React is based on JavaScript, but it’s mostly combined with JSX (JavaScript XML), a syntax extension that allows you to create elements that contain HTML and JavaScript at the same time.
                                    <br />
                                    Anything you create with JSX could also be created with the React JavaScript API, but most developers prefer JSX because it’s more intuitive.</p>
                            </div>
                            <br />

                            <div>
                                <h1 className='text-3xl font-semibold text-center'>Angular</h1>
                                <p>In this article, I’m discussing Angular 2, and not the first version of the framework which is now known as AngularJS.
                                    <br />

                                    AngularJS, the original framework, is an MVC (Model-View-Controller)) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.
                                    <br />

                                    Projects in Angular are structured into Modules, Components, and Services. Each Angular application has at least one root component and one root module.

                                    <br />
                                    Each component in Angular contains a Template, a Class that defines the application logic, and MetaData (Decorators). The metadata for a component tells Angular where to find the building blocks that it needs to create and present its view.

                                    <br />
                                    Angular templates are written in HTML but can also include Angular template syntax with special directives to output reactive data and render multiple elements, among other things.

                                    <br />
                                    Services in Angular are used by Components to delegate business-logic tasks such as fetching data or validating input. They are a distinct part of Angular applications. While Angular doesn’t enforce their use, it’s highly suggested to structure apps as a set of distinct services that can be reused.

                                    <br />
                                    Angular is built in TypeScript, so its use is recommended to get the most seamless experience, but plain JavaScript is also supported.</p>
                            </div>
                            <br />

                            <div>
                                <h1 className='text-3xl font-semibold text-center'>Vue</h1>
                                <p>The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.
                                    <br />
                                    Although Vue is not strictly associated with the MVVM (Model-View-ViewModel) pattern, its design was partly inspired by it. With Vue, you’ll be working mostly on the ViewModel layer, to make sure that the application data is processed in a way that allows the framework to render an up-to-date View.
                                    <br />
                                    Vue’s templating syntax lets you create View components, and it combines familiar HTML with special directives and features. This templating syntax is preferred, even though raw JavaScript and JSX are also supported.
                                    <br />
                                    Components in Vue are small, self-contained, and can be reused throughout the application. Single File Components (SFCs) with the .vue extension contain HTML, CSS, and JavaScript so that all relevant code resides in one file.
                                    <br />
                                    SFCs are the recommended way to organize code in Vue.js projects, especially larger ones. Tools such as Webpack or Browserify are required to transpile SFCs into working JavaScript code.</p>
                            </div>
                            <br />

                        </div>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default Blog;