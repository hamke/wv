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
    alert('신고 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  });