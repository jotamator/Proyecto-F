import { useState, useRef } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Resizer from "react-image-file-resizer";

export default function Home() {
  const root_url = process.env.NEXT_PUBLIC_ROOT_URL;
  const inputRef = useRef();
  const newSize = useRef();
  const [shortUrl, setShortUrl] = useState("");
  const [entireUrl, setEntireUrl] = useState("");
  const [newImage, setNewImage] = useState("");
  
  const fileChangedHandler = (event)=>{
    var fileInput = false;
    const size = newSize.current.value;
    
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          size,
          size,
          "png",
          100,
          0,
          (uri) => {
            setNewImage(uri);
          },
          "base64",
          1,
          1
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const url = inputRef.current.value;
    fetch('/api/shortUrl', {
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({url})
    }).then(res=>res.json())
    .then(data=>{
      const realShortUrl = `http://${root_url}/${data.data.shortUrl}`; 
      setEntireUrl(data.data.url);
      setShortUrl(realShortUrl);
    })
  }
  return (
    <>
      <Head>
        <title>Url Mannager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://widget.Cloudinary.com/v2.0/global/all.js" type="text/javascript"/>
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
            <form className={styles.card} onSubmit={handleSubmit}>
              <input ref={inputRef} type="text" className={styles.input} placeholder="url"/>
              <button className={styles.button}>Acortar</button>
              {entireUrl && 
                <span className={styles.input}>
                  visita la pagina {entireUrl} 
                  con esta url <a href={shortUrl}>{shortUrl}</a>
                </span>
              }
            </form>
            <form className={styles.card}>
            
              <input ref={newSize}  type="text" className={styles.input} placeholder="Size"/>

                {newSize && 
                 <input type="file" onChange={fileChangedHandler}/>
                }   

                {newImage && 
                 <img src={newImage} alt="nueva imagen" />
                }   
            </form>
          </div>
          
        </main>
    </>
  )
}

