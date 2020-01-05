import '../styles/index.css'

const Container = (props) => (
  <div className="container bg-gray-100 text-gray-900 mx-auto">
    {props.children}
  </div>
)

export default Container