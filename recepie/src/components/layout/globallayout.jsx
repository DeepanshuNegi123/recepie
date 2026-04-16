
import { Outlet } from "react-router-dom"
import Sidebar from "../../pages/globalfront/sider"
const GLOBALLAYOUT = ()=>
{

return(
<main className="flex-grow w-full">
    <Outlet/>
</main>


)


    
}

export default GLOBALLAYOUT