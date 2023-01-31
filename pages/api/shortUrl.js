import { PrismaClient } from ".prisma/client";

export default async (req, res) =>{
  const prisma = new PrismaClient();
  const{url} = req.body;
  const shortUrl =Math.random().toString(36).substr(2,5);
  try {
    let data = await prisma.link.findUnique({
      where:{url : url}
    });
    if(!data)
    {
        data = await prisma.link.create({
        data:{url, shortUrl}
      });
    }
    else{
      console.log('url repetida');
    }
    return res.status(200).send({data});
  } catch (error) {
    res.status(500).send({error});
  }
  
}