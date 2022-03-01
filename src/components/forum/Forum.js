import { useEffect, useState } from 'react';
import "./forum.css"

const Forum = () => {

  const [forums, setForums] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}forum`)
      .then(res => res.json())
      .then(data => setForums(data.data))
      .catch(err => console.log(err))
  }, [])

  const handleClick = (id) => {
    if (localStorage.getItem('token') === null) {
      console.log('No estas logeado');
      window.location.href = '/login';
    } else {
      window.location.href = `/forum/${id}`;
      console.log('Estas logeado');
    }
  }


  return (
    <div className="forum-container">
      <div className="forum-title">
        <h1>Foros</h1>
      </div>
      <div className="forum-content">
        <div className="forum-content-container">
          <table className="forum-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tema</th>
                <th>Descripción</th>
                <th>Fecha Creacion</th>
                <th>Fecha Actualización</th>
              </tr>
            </thead>
            <tbody>
              {forums.map(forum => (
                <tr key={forum.code}>
                  <td><button onClick={() => handleClick(forum.code)}>{forum.title}</button></td>
                  <td>{forum.topic}</td>
                  <td>
                    {
                      forum.images.length!==0 ?
                      <div className="container-images">
                        {forum.images.map((image, index) => (
                          <img key={index} src={image} alt="" className="forum-image" />
                        ))}
                      </div>


                      :
                      null
                    }
                    <span>{forum.description}</span>
                  </td>
                  <td>{forum.created_at.substring(0, 10)}</td>
                  <td>{forum.updated_at.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default Forum