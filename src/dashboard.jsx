import styled from "styled-components"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'

import AddTask from "./components/addTask"

import { db, auth } from "./db/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { isAdmin } from "./middleware/auth"

export default function Dashboard() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [admin, setIsAdmin] = useState(false)

    const [searchTugas, setSearchTugas] = useState("")
    const [filter, setFilter] = useState("-")
    const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])

    const [taskData, setTaskData] = useState([])

    const [toggleCard, setToggleCard] = useState(false)

    function handlePopup(value) {
        setToggleCard(value)
    }

    async function logIn() {
        try {
            const provider = new GoogleAuthProvider()
            const user = await signInWithPopup(auth, provider)
            // Console.log for development
            // console.log(user)
            const store = {
                email: user.user.email,
                displayName: user.user.displayName
            }
            const adminCheck = isAdmin(store.email)
            if (adminCheck) {
                Cookies.set('loginData', JSON.stringify(store))
                Cookies.set('isLoggedIn', true)
                Cookies.set('isAdmin', adminCheck)

                setIsLoggedIn(true)
                setIsAdmin(adminCheck)
            } else {
                swal({
                    icon: 'error',
                    title: 'Kamu bukan admin hey',
                    button: 'Oalah'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    function logout() {
        const alert = swal({
            icon: 'warning',
            title: 'Ingin LogOut?',
            buttons: ['Tidak', 'Yoi'],
            dangerMode: true
        })

        if (alert) {
            Cookies.remove("loginData")
            Cookies.remove("isAdmin")
            Cookies.remove("isLoggedIn")
            location.reload()
        }
    }

    function DisplayTask() {
        let data = taskData;

        data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        const dis = data.map((i, index) =>
            <div className="card" key={index}>
                <div className="card-header">
                    <h2 className="task-name">{i.tugas}</h2>
                    <p className="course-name">{i.matkul}</p>
                </div>
                <div className="card-body">
                    <p className="task-desc">Deskripsi Tugas: {i.desc}</p>
                    Sekarang Tanggal: {`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
                    <p className="deadline">Deadline: {i.deadline}</p>
                </div>
            </div>
        );

        return dis;
    }


    async function getTask() {
        try {
            const get = await getDocs(query(collection(db, 'tugas_h'), orderBy('time', 'asc')))
            const tempData = []
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })
            setTaskData(tempData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTask()

        setIsLoggedIn(Cookies.get("isLoggedIn") == "true" || false)
        setIsAdmin(Cookies.get('isAdmin') == "true" || false)

    }, [])

    return (
        <>
            {toggleCard && (<AddTask setPopup={handlePopup}></AddTask>)}
            <Container>
                <Filter className="overflow">
                    <input className="input" type="text" placeholder="Cari Tugas" value={searchTugas} onChange={(e) => setSearchTugas(e.target.value)} />
                    <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="-">Filter</option>
                        <option value="outdate">Lewat Deadline</option>
                    </select>
                    <input className="input" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                    {admin && (<button className="btn" onClick={() => setToggleCard(!toggleCard)}>ADD</button>)}
                    {admin && (<button className="btn" onClick={logout}>LogOut</button>)}
                    {!isLoggedIn && (<button className="btn" onClick={logIn}>LOGIN ADMIN</button>)}
                </Filter>
                <Wrapper className="overflow">
                    <DisplayTask></DisplayTask>
                </Wrapper>
            </Container>
        </>
    )
}

const Container = styled.div`
    background-color: #FFFBE6;
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const Filter = styled.div`
    width: 80%;
    height: 70px;
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: auto;

    &.overflow::-webkit-scrollbar{
        width: 10px;
    }

    &.overflow::-webkit-scrollbar-thumb{
        width: 10px;
        border-radius: 50px;
        background-color: #C0EBA6;
    }

    .input{
        background-color: #C0EBA6;
        color: #347928;
        font-weight: bold;
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 0 15px;
        font-size: 15px;
        height: 60%;

    }

    .btn{
        cursor: pointer;
        background-color: #C0EBA6;
        color: #347928;
        border: none;
        border-radius: 5px;
        height: 60%;
        padding: 0 20px;
        font-weight: bold;
    }
`

const Wrapper = styled.div`
    border: 3px solid #FCCD2A;
    border-radius: 15px;
    width: 80%;
    height: 80%;
    overflow-y: auto;

    &.overflow::-webkit-scrollbar{
        width: 10px;
    }

    &.overflow::-webkit-scrollbar-thumb{
        width: 10px;
        border-radius: 50px;
        background-color: #FCCD2A;
    }

    .card {
    width: 70%;
    margin: 20px auto;
    background-color: #FFFBE6;
    border-left: 10px solid #347928;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

.card:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-header {
    background-color: #C0EBA6; /* Warna background header dari palette */
    padding: 10px;
    border-radius: 6px 6px 0 0;
    color: #347928;
}

.task-name {
    font-size: 24px;
    margin-bottom: 5px;
    color: #347928; /* Menggunakan warna hijau tua */
}

.course-name {
    font-size: 16px;
    margin-bottom: 10px;
    color: #347928; /* Warna hijau tua */
}

.card-body {
    padding: 10px;
    color: #666;
}

.task-desc {
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 1.5;
    color: #333;
}

.deadline {
    font-size: 14px;
    font-weight: bold;
    color: #fc2a2af1; /* Warna kuning untuk deadline */
}

`