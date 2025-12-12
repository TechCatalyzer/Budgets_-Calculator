import logo from "../assets/logo.jpeg";

const LeftSidePanel = () => {
  return (
        <div className="w-1/2 bg-white flex items-center justify-center overflow-hidden">
            <img
                src={logo}
                alt="background"
                className="w-full h-full object-contain p-6"
            />
        </div>

  )
}

export default LeftSidePanel