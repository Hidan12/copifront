import { useSelector } from "react-redux"
import "./home.css"
import { useEffect, useState } from "react";
import axios from "axios";


const Home = ()=>{
  const [content, setContent] = useState({ html: '', scripts: [], styles: [] });

    useEffect(() => {
        const fetchProxiedPage = async () => {
            const response = await fetch('http://localhost:8080/api/page/read');
            const data = await response.json();
            setContent(data);
        };

        fetchProxiedPage();
    }, []);

    useEffect(() => {
        //1. Inyectar estilos
        content.styles.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        });

        //2. Inyectar scripts
        const scriptPromises = content.scripts.map(src => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
            });
        });

        // 3. Rehidratación después de cargar scripts
        Promise.all(scriptPromises).then(() => {
            // Forzar re-ejecución de eventos
            window.dispatchEvent(new Event('load'));
            console.log('Interactivity restored!');
        });

        //Limpieza
        return () => {
            document.querySelectorAll('link[data-proxy]').forEach(el => el.remove());
            document.querySelectorAll('script[data-proxy]').forEach(el => el.remove());
        };
    }, [content]);
    
    return(
    <div 
            dangerouslySetInnerHTML={{ __html: content.html }} 
            id="proxy-content"
        />
    )
}
export default Home