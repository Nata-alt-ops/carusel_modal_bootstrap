import React, { useState, useEffect } from 'react';
import '../main/Main.scss';
import { useForm } from 'react-hook-form';
import { Modal, Toast } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
type PictureMeme = {
  id: number;
  title: string;
  photo: string; 
};


type FormValues = {
  title: string;
  photoFile: FileList | null;
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
  const id = pictures.length === 0 ? 1 : Math.max(...pictures.map(p => p.id)) + 1;


  if (data.photoFile && data.photoFile.length > 0) {
    const file = data.photoFile[0];

    const reader = new FileReader();
    reader.onload = () => {
      const newPicture: PictureMeme = {
        id,
        title: data.title,
        photo: reader.result as string, 
      };

      setPictures(prev => [...prev, newPicture]); 
      reset({ title: '' });

      const modal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop')!);
      modal.hide();
    };
    reader.readAsDataURL(file);
  } 

  else {
    const newPicture: PictureMeme = {
      id,
      title: data.title,
      photo: '', 
    };

    setPictures(prev => [...prev, newPicture]);
    reset({ title: '' });

    const modal = Modal.getOrCreateInstance(document.getElementById('staticBackdrop')!);
    modal.hide();
  }
};
        

     useEffect(() => {
  const modalElement = document.getElementById('staticBackdrop');
  if (!modalElement) return;

  const handleReset = () => {
    reset({ title: '', photoFile : null  });

  };

  modalElement.addEventListener('hidden.bs.modal', handleReset);

  return () => {
    modalElement.removeEventListener('hidden.bs.modal', handleReset);
  };
}, [reset]);
useEffect(() => {
  const toastEl = document.getElementById('liveToast');
  if (toastEl) {
  
    new Toast(toastEl);
  }
}, []);


/*useEffect(() => {
  console.log('Modal:', Modal); // должен быть [class Modal]
}, []);*/







  return (
    <div className="example_page ">

       
        
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
                    {...register('photoFile')}></input>
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


<div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
        Элемент аккордеона #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Если ты не голубой подрисуй вагон другой
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Элемент аккордеона #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Смерть пришла к старому парихмахеру с косой, а ушла с косой
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Элемент аккордеона #3
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        я хз, че тут писать. Фантазия закончилась
      </div>
    </div>
  </div>
</div>

       
<div className='w'>
  <div className='e'>
<h1>Живой пример</h1>
<button type="button" className="btn btn-primary" id="liveToastBtn"
   onClick={() => {
    const toastLiveExample = document.getElementById('liveToast');

    if (toastLiveExample) { 
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    }
  }}

>Живой пример</button>

<div className="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="..." className="rounded me-2" alt="..." />
      <strong className="me-auto">Bootstrap</strong>
      <small>11 мин назад</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
    </div>
    <div className="toast-body">
      Привет, мир! Это тост-сообщение.
    </div>
  </div>
</div>






<h1>Полупрозрачный </h1>
<button type="button" className="btn btn-primary" id="liveToastBtn"
   onClick={() => {
     const toastLiveExample = document.getElementById('liveToast');
     
     if (toastLiveExample) { 
       const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
       toastBootstrap.show();
      }
    }} >Полупрозрачное приложение</button>
<div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header">
    <img src="..." className="rounded me-2" alt="..." />
    <strong className="me-auto">Bootstrap</strong>
    <small className="text-body-secondary">11 мин. назад</small>
    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
  </div>
  <div className="toast-body">
    Привет мир! Это тост-сообщение.
  </div>
</div>
      

     


<h1>Группа сообщений</h1>

<button type="button" className="btn btn-primary" id="liveToastBtn"
   onClick={() => {
     // Получаем все toast элементы
     const toastElements = document.querySelectorAll('.toast-container.position-static .toast');
     console.log('Found elements:', toastElements); // Проверьте в консоли
     
     // Для каждого элемента создаем и показываем toast
     toastElements.forEach(toastElement => {
       const toastBootstrap = Toast.getOrCreateInstance(toastElement);
       toastBootstrap.show();
      });
    }}>Группа уведом.</button>
<div className="toast-container position-static ">
  <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="..." className="rounded me-2" alt="..." />
      <strong className="me-auto">Bootstrap</strong>
      <small className="text-body-secondary">прямо сейчас</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
    </div>
    <div className="toast-body">
      Видите? Именно так.
    </div>
  </div>

  <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="..." className="rounded me-2" alt="..." />
      <strong className="me-auto">Bootstrap</strong>
      <small className="text-body-secondary">2 секунды назад</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
    </div>
    <div className="toast-body">
      Внимание, всплывающие сообщения складываются автоматически
    </div>
  </div>
</div>

<button type="button" className="btn btn-primary" 
   onClick={() => {
    // Используем querySelector для поиска по классам
    const toastLiveExample = document.querySelector('.toast.align-items-center');

    if (toastLiveExample) { 
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    }
  }}>
  свое сообщение
</button>

<div className="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
  {/*<div className="d-flex">
    <div className="toast-body">
      Привет, мир! Это тост-сообщение.
      <div className="mt-2 pt-2 border-top">
      <button type="button" className="btn btn-primary btn-sm">Действовать</button>
      <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Закрыть</button>
    </div>
    </div>
  </div>*/}
   <div className="d-flex">
    <div className="toast-body">
      Привет, мир! Это тост-сообщение.
    </div>
    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Закрыть"></button>
  </div>
</div>
</div>
    








</div>



















    </div>
  );
};