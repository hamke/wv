// Report Sites
function getTargetUrl(url) {
    const urlObj = new URL(url);
    const targetUrl = urlObj.searchParams.get("url");
    return targetUrl;
  }

  function showReportSuccessMessage() {

    const successMessage = document.getElementById('report-success-message');
    successMessage.classList.add('show');
    
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 3000);
  }

  // document.body.addEventListener('htmx:afterRequest', function(event) {
  //   console.log('Success : ', event.detail);
  //   showReportSuccessMessage();
  // });

  // HTMX Error Details
  document.body.addEventListener('htmx:responseError', function(event) {
    console.error('Error : ', event.detail);
    alert('通報の送信中にエラーが発生しました。しばらくしてから再試行してください。');
  });