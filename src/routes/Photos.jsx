import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(photos);
  const deletePhoto = (id) => {
    fetch("http://localhost:3001/photos/" + id, {
      method: "DELETE",
    }).then(() =>
      setPhotos((photos) => {
        return photos.filter((photo) => photo.id !== id);
      })
    );
    // try {
    //   const responseDelete = await fetch(`http://localhost:3001/photos/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const responseDeleteJson = await responseDelete.json();
    //   try {
    //     const responseGet = await fetch("http://localhost:3001/photos");
    //     const responseGetJson = await responseGet.json();
    //     setPhotos(responseGetJson);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error);
    //     setLoading(loading);
    //   }
    // } catch (error) {
    //   setError(error);
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    setLoading(true);
    if (sort == "asc") {
      if (!submited) {
        fetch("http://localhost:3001/photos?_sort=id&_order=asc")
          .then((response) => response.json())
          .then((data) => {
            setPhotos(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      } else {
        fetch("http://localhost:3001/photos?_sort=id&_order=asc&q=" + submited)
          .then((response) => response.json())
          .then((data) => {
            setPhotos(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }
    } else if (sort == "desc") {
      if (!submited) {
        fetch("http://localhost:3001/photos?_sort=id&_order=desc")
          .then((response) => response.json())
          .then((data) => {
            setPhotos(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      } else {
        fetch("http://localhost:3001/photos?_sort=id&_order=desc&q=" + submited)
          .then((response) => response.json())
          .then((data) => {
            setPhotos(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }
    }
  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/photos")
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error)
    return (
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        Error!
      </h1>
    );

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
