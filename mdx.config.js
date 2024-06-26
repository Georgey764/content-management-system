const components = {
  h1: (props) => (
    <h1 {...props} className="text-6xl my-2">
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h1 {...props} className="text-5xl my-2">
      {props.children}
    </h1>
  ),
  h3: (props) => (
    <h1 {...props} className="text-4xl my-2">
      {props.children}
    </h1>
  ),
  h4: (props) => (
    <h1 {...props} className="text-3xl my-2">
      {props.children}
    </h1>
  ),
  h5: (props) => (
    <h1 {...props} className="text-2xl my-2">
      {props.children}
    </h1>
  ),
  h6: (props) => (
    <h1 {...props} className="text-xl my-2">
      {props.children}
    </h1>
  ),
  ol: (props) => (
    <ol {...props} className="list-decimal pl-8 m-2">
      {props.children}
    </ol>
  ),
  ul: (props) => (
    <ol {...props} className="list-disc pl-8 m-2">
      {props.children}
    </ol>
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="bg-slate-200 px-3 py-1 my-2 border-l-8 border-slate-400"
    >
      {props.children}
    </blockquote>
  ),
  hr: (props) => (
    <hr {...props} className="my-8 h-[2px] bg-slate-400 rounded" />
  ),
  a: (props) => (
    <a {...props} className="text-blue-600 underline hover:text-blue-700">
      {props.children}
    </a>
  ),
  img: (props) => <img {...props} className="m-auto my-8" />,
};

export default components;
