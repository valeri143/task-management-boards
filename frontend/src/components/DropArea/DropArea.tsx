import { useState } from "react"
const DropArea = ({handleDrop}: any) => {
  const [showDrop, setShowDrop] = useState(false)

  return (
    <section
     onDragEnter={() => setShowDrop(true)}
     onDragLeave={() => setShowDrop(false)}
     onDrop={() => {
      handleDrop();
       setShowDrop(false);
     }}
     onDragOver={(e) => e.preventDefault()}
     className={showDrop ? "drop-area" : "hide-drop"}
     >
      Drop here
    </section>
  )
}

export default DropArea
