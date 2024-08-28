import CustomForm from "@/components/Form";
import { getFormById } from "@/data/getFormData";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
const FormPage = () => {
    const {id}= useParams();

    const {data:form}= useQuery({
        queryKey: ["inform"],
        queryFn: () => getFormById(Number(id))
    })
    console.log(form)
    if(!form?.data){
        return <div>Form not found</div>
    }
    return(
        <CustomForm formData={form?.data[0]}/>
    )
}

export default FormPage