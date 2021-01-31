// import checkNumInputs from './checkNumInputs';
import { postData } from "../services/requests";
const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');


    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: "assets/img/fail.png"
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    // const postData = async(url, data) => {
    //     let res = await fetch(url, {
    //         method: "POST",
    //         body: data
    //     });

    //     return await res.text();
    // };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach((item) => {
            item.previousElementSibling.textContent = 'Тологон красава';
        })
    };
    upload.forEach((item) => {
        item.addEventListener('input', () => {
            let dots;
            item.files[0].name.split('.')[0].length > 5 ? dots = '...' : dots = '.';
            const name = item.files[0].name.split('.')[0].substring(0, 6) + dots + item.files[0].name.split('.')[1];
            item.previousElementSibling.textContent = name;
        });
    })
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            } else {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            // let api;

            // item.closest('.popup-design') || item.classList.contains('calc-form') ? api = path.designer : api = path.question;





            postData(path.question, formData)
                .then(res => {
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                    console.log(res);
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;