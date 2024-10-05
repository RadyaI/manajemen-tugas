import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Dashboard() {

    const [searchTugas, setSearchTugas] = useState("")
    const [filter, setFilter] = useState("-")
    const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0])

    return (
        <>
            <Container>
                <Filter className="overflow">
                    <input className="input" type="text" placeholder="Cari Tugas" value={searchTugas} onChange={(e) => setSearchTugas(e.target.value)}/>
                    <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="-">Filter</option>
                        <option value="terdekat">Terdekat</option>
                        <option value="terlama">Terlama</option>
                    </select>
                    <input className="input" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                    <button className="btn">ADD</button>
                    <button className="btn">LOGIN ADMIN</button>
                </Filter>
                <Wrapper></Wrapper>
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
`