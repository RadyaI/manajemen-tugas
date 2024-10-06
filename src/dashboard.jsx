import styled from "styled-components"
import { useEffect, useState } from "react"

import AddTask from "./components/addTask"

export default function Dashboard() {

    const [searchTugas, setSearchTugas] = useState("")
    const [filter, setFilter] = useState("-")
    const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])

    const [toggleCard, setToggleCard] = useState(false)

    function handlePopup(value) {
        setToggleCard(value)
    }

    return (
        <>
            {toggleCard && (<AddTask setPopup={handlePopup}></AddTask>)}
            <Container>
                <Filter className="overflow">
                    <input className="input" type="text" placeholder="Cari Tugas" value={searchTugas} onChange={(e) => setSearchTugas(e.target.value)} />
                    <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="-">Filter</option>
                        <option value="terdekat">Terdekat</option>
                        <option value="terlama">Terlama</option>
                        <option value="terakhir_diupdate">Terakhir Ditambah</option>
                    </select>
                    <input className="input" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                    <button className="btn" onClick={() => setToggleCard(!toggleCard)}>ADD</button>
                    <button className="btn">LOGIN ADMIN</button>
                </Filter>
                <Wrapper>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="task-name">Nama Tugas</h2>
                            <p class="course-name">Mata Kuliah</p>
                        </div>
                        <div class="card-body">
                            <p class="task-desc">Deskripsi Tugas: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                            <p class="deadline">Deadline: 12 Oktober 2024</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="task-name">Nama Tugas</h2>
                            <p class="course-name">Mata Kuliah</p>
                        </div>
                        <div class="card-body">
                            <p class="task-desc">Deskripsi Tugas: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                            <p class="deadline">Deadline: 12 Oktober 2024</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="task-name">Nama Tugas</h2>
                            <p class="course-name">Mata Kuliah</p>
                        </div>
                        <div class="card-body">
                            <p class="task-desc">Deskripsi Tugas: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                            <p class="deadline">Deadline: 12 Oktober 2024</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h2 class="task-name">Nama Tugas</h2>
                            <p class="course-name">Mata Kuliah</p>
                        </div>
                        <div class="card-body">
                            <p class="task-desc">Deskripsi Tugas: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
                            <p class="deadline">Deadline: 12 Oktober 2024</p>
                        </div>
                    </div>

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
    color: #FCCD2A; /* Warna kuning untuk deadline */
}

`