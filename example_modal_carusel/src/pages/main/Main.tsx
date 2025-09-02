import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../main/Main.scss';



type PictureMeme = {
  id: number;
  title: string;
  photo: string; 
};

export const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState<PictureMeme[]>([
    {
      id: 1,
      title: 'Картинка котика',
      photo: '/cat.jpg', 
    },
    {
      id: 2,
      title: 'Крутой котик',
      photo: '/cat2.jpg', 
    },
     {
      id: 3,
      title: 'Крутой котик',
      photo: '/cat3.jpg', 
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    photoFile: null as File | null,
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, photoFile: file }));
  };

  const handleSubmit = () => {
    const { title, photoFile } = formData;

    if (!title.trim() || !photoFile) {
      alert('Заполните заголовок и выберите изображение');
      return;
    }

    
    const reader = new FileReader();
    reader.onload = () => {
      const newPicture: PictureMeme = {
        id: Date.now(), 
        title,
        photo: reader.result as string, 
      };

      setPictures((prev) => [...prev, newPicture]);

    
      setFormData({ title: '', photoFile: null });

     
      
    };

    reader.readAsDataURL(photoFile);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1500); 

  return () => clearTimeout(timer);
  }, []);

  return (
    <div className="example_page p-4">
        
    
      <button
        type="button"
        className="btn btn-dark button_modal"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Добавить картинку
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Добавить картинку</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" ></button>
            </div>

            <div className="modal-body">

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Название:</span>
                    <input type="text" className="form-control" aria-label="Пример размера поля ввода" aria-describedby="inputGroup-sizing-default" value={formData.title} name="title"
                  onChange={handleChange} />
                </div>

                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile02"  onChange={handleFileChange} />
                    
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleSubmit}>Добавить</button>
            </div>
            </div>
        </div>
        </div>


       
    <div className='carusel'>
      {/* Карусель*/}
      <div className="mt-5">
        <h3 className="fs-3">Добавленные картинки</h3>
        {pictures.length === 0 ? (<p>Пока нет добавленных мемов.</p>) : ( 
            <div id="carouselMemes" className="carousel slide" data-bs-ride="carousel">


            <div className="carousel-inner">
              {pictures.map((pic, index) => (
                <div key={pic.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="card mx-auto" style={{ maxWidth: '250px' }}>
                    <img src={pic.photo} className="card-img-top" alt={pic.title}/>
                    <div className="card-body">
                      <p className="card-text">{pic.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

             <button className="carousel-control-prev" type="button" 
             data-bs-target="#carouselMemes"
              data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Предыдущий</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselMemes" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Следующий</span>
            </button>
            
          </div>
        )}
      </div>
      </div>







    </div>
  );
};