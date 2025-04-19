const useDate = () => {

    const todayDate = new Date();
    const apiDate = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

    return apiDate;
}
export default useDate;