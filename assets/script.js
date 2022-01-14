var url_group = "https://chat.whatsapp.com/HnSD5SJsSQc7kKSfXrcFFN";
var name = "";
function group() {
  location.href = url_group;
}
function requestmenu() {
  var Toast = Swal.mixin({
    showClass: {
      popup: "animate__bounceInRight",
    },
    hideClass: {
      popup: "animate__bounceOutRight",
    },
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
  });
}
try {
  console.log(nomusic);
} catch (e) {
  swal
    .fire({
      title: "Do you want to play your own song from youtube?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: `No`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swal
          .fire({
            title: "Enter youtube link to play !",
            input: "url",
            inputAttributes: {
              autocapitalize: "off",
              pattern: "^https?://(www.)?(youtu.be/)?(youtube.com/watch)?.*",
            },
            showLoaderOnConfirm: true,
            confirmButtonText: "Play it !",
            showCancelButton: true,
            preConfirm: (value) => {
              if (
                !/^https?\:\/\/(www\.|m\.)?(youtube\.com\/watch\?v=|youtu\.be\/)(.+$)/.test(
                  value
                )
              ) {
                Swal.showValidationMessage(
                  `Url yang anda masukkan tidak valid`
                );
              } else {
                return fetch(
                  "https://hadi-api.herokuapp.com/api/yt2/audio?url=" + value
                )
                  .then((resp) => resp.json())
                  .then((resp) => {
                    if (resp.status == 200) {
                      var audio = document.createElement("audio");
                      audio.autoplay = "autoplay";
                      audio.src = resp.result.download_audio;
                      name = resp.result.title;
                      audio.onended = function () {
                        Swal.fire({
                          title:
                            "The music has finished do you want to play it back?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes",
                          cancelButtonText: `No`,
                        }).then((answer) => {
                          if (answer.isConfirmed) {
                            document.querySelector("audio").play();
                          }
                        });
                      };
                      document.body.appendChild(audio);
                      requestmenu();
                    } else {
                      Swal.showValidationMessage(
                        `Periksa kembali url yang anda masukkan`
                      );
                    }
                  });
              }
            },
          })
          .then((answer) => {
          	requestmenu();
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: (name.length > 1 ? "success" : "warning"),
              title: (name.length > 1 ? "Play" + name : "No song playing"),
            });
          });
      } else {
        requestmenu();
      }
    });
}