import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const Header=()=>{
    return(
    <>
    <div>
        <header className="bg-white shadow-lg ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center ">
                    <h1>
                        NOTE
                    </h1>
                    <Button variant="outline"> <Plus/>New Note</Button>
                </div>
                
            </div>
        </header>
     

    </div>
    </>
)
}
export default Header;