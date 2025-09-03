import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../main/Main.scss';
import { useForm } from 'react-hook-form';
import Modal from 'bootstrap/js/dist/modal';

type PictureMeme = {
  id: number;
  title: string;
  photo: string; 
};


type FormValues = {
  title: string;
  photoFile: FileList;
};


export const Main = () => {
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
  const { register, handleSubmit, formState:{ errors }, setError, reset } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(true);

    const onSubmit = (data: FormValues) => {
        const file = data.photoFile[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          const newPicture: PictureMeme = {
            id: pictures.length === 0 ? 1 : Math.max(...pictures.map(p => p.id)) + 1,
            title: data.title,
            photo: reader.result as string,
          };

          setPictures(prev => [...prev, newPicture]);

          reset({ title: ''});

          const closeModal = document.getElementById('staticBackdrop');
            if (closeModal) {
              const modal = Modal.getOrCreateInstance(closeModal);
              modal?.hide();
            }
          };
          reader.readAsDataURL(file);
      };
        

     useEffect(() => {
  const modalElement = document.getElementById('staticBackdrop');
  if (!modalElement) return;

  const handleReset = () => {
    reset({ title: '' });

    const fileInput = modalElement.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  modalElement.addEventListener('hidden.bs.modal', handleReset);

  return () => {
    modalElement.removeEventListener('hidden.bs.modal', handleReset);
  };
}, [reset]);



  return (
    <div className="example_page p-4">
        
    
      <button
        type="button"
        className="btn btn-dark button_modal"
         onClick={() => {
    const modal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop')!);
    modal.show();
  }}
      >
        Добавить картинку
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-keyboard="false" data-bs-backdrop="true" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Добавить картинку</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть" ></button>
            </div>

            <div className="modal-body">

                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Название:</span>
                    <input type="text"  aria-label="Пример размера поля ввода" aria-describedby="inputGroup-sizing-default" className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    {...register('title', { required: 'Введите название' })}/>
                   {errors.title && <div className="invalid-feedback d-block">{errors.title.message}</div>}
                </div>

                <div className="input-group mb-3">
                  <input type="file"  aria-label="file example"  className={`form-control ${errors.photoFile ? 'is-invalid' : ''}`}
                    {...register('photoFile', { required: 'Выберите файл' })}></input>
                   {errors.photoFile && <div className="invalid-feedback d-block">{errors.photoFile.message}</div>}
                    
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </div>


                </form>
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