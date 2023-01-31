import { redirect } from "next/dist/server/api-utils";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default function ShortIdPage(){
    return ;
}

export async function getServerSideProps({params}){
    const {shortId} = params;
    const data2 = await prisma.link.findUnique({
            where:{shortUrl : shortId}
    });
    
    if(!data2){
        console.log('no se encontro la url');
        return {redirect:{destination:'/'}};
    }
    else{
        return {redirect:{destination:data2.url}};
    }
    
}