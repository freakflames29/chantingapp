const useTimeAgo = (timestamp) => {

    const timeCal = ()=> {
        const now = new Date();
        const then = new Date(timestamp);
        const diffInMilliseconds = now - then;
        const diffInMinutes = Math.floor(diffInMilliseconds / (60 * 1000));
        const hours = Math.floor(diffInMinutes / 60);
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        const minutes = diffInMinutes % 60;

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hr${hours > 1 ? 's' : ''} ago, ${minutes}min${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        }
    }
    return timeCal
}
export default useTimeAgo;