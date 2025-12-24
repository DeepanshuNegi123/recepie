
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const Globe  = ()=>{


return(

<div className="p-0 m-0">

<div className="perspective">
 <GlobeAltIcon
  className="
    h-8 w-8 text-gray-600 cursor-pointer
    transition-transform duration-1000 ease-linear
    hover:[transform:rotateY(360deg)]
  "
/>
</div>

</div>


)

}


export default Globe;