export const normalizeResponseErrors = res => {
    if (!res.ok) {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) {
            // It's a nice JSON error returned by us, so decode it
            return res.json().then(err => Promise.reject(err));
        }
        // It's a less informative error returned by express
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
    }
    return res;
};

export const formatDate = (dateObj) => {
        const date = new Date(dateObj);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return monthNames[date.getMonth()] + '-' + date.getDate() + '-' + date.getFullYear();
};

export const formatTime = (totalSeconds) => {

      let hours   = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
      let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100

      let result = (hours < 10 ? "0" + hours : hours);
          result += ":" + (minutes < 10 ? "0" + minutes : minutes);
          result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
        return result;
};