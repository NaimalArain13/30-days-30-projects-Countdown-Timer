import {Button} from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function Contact(){
  return(
    <div className="flex justify-center items-center min-h-screen  bg-slate-300  w-full">
      <div className="w-full max-w-sm items-center grid gap-1.5">
      <h1 className="text-blue-700 text-center text-2xl font-bold hover:text-blue-900 mb-6">Contact Us</h1>
      <Label htmlFor="username">Username</Label>
      <Input id="name" type="input" />
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white  pt-30"><Link href="//ui.shadcn.com/docs" >Submit</Link></Button>
    

      
    </div>
    </div>
  )
}
