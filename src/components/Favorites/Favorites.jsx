import React, { useState, useEffect } from 'react'
import { Table, Button, Dropdown, Menu, Select,Popconfirm } from 'antd'
import styles from './Favorites.module.css';
import render from 'react-dom';
import { DownOutlined } from '@ant-design/icons';
import { fetchCountries, fetchData } from '../../api';


const Favorites = () => {
    const { Option } = Select;
    const dataSource = [
        {
            country: 'Ecuador',
            infected: 31000,
            deaths: 3200,
            recovered: 300,
        },
        {
            country: 'USA',
            infected: 2000000,
            deaths: 300000,
            recovered: 70000,
          },
      ];
      
      const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: (a, b) => a.country > b.country,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Infected',
            dataIndex: 'infected',
            key: 'infected',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.infected - b.infected,
        },
        {
            title: 'Deaths',
            dataIndex: 'deaths',
            key: 'deaths',
        },
        {
            title: 'Recovered',
            dataIndex: 'recovered',
            key: 'recovered',
        },
        {
            title: 'Action',
            key: 'action',
            //render: () => <a onClick={(e)=>handleDelete(e)}>Delete</a>,
            render: (text, record) =>
          favorites.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,


        }
      ];

      const [fetchedCountries, setFetchedCountries] = useState([])
    useEffect(() => {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries());
        };
        fetchAPI();
        console.log("called!")
    }, [fetchedCountries]);

    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        const fetchAPI = async() => {
            setFetchedCountries(await fetchCountries());
        };
        fetchAPI();
    }, [favorites]);

    const [selectedCountry, setSelectedCountry] = useState("")

    let handleAddFavorite = async () => {
        const fetchedData = await fetchData(selectedCountry);
        setFavorites( favorites.concat({
            country: selectedCountry,
            infected: fetchedData.confirmed.value,
            deaths: fetchedData.deaths.value,
            recovered:fetchedData.recovered.value,
            key: selectedCountry
        }))
        console.log(fetchedCountries)
        console.log(selectedCountry)
        setFetchedCountries(fetchedCountries.filter(item => item !== selectedCountry))
    }

    let handleSelected = (o) => {
        setSelectedCountry(o)
    }

    let handleDelete = (c) => {
        console.log(c)
        setFavorites(favorites.filter(item => item.key !== c))
        //console.log(favorites)
    }

    return (
        <>
            <Select onSelect={(o) => handleSelected(o)}>
            { fetchedCountries.map((country, i) => <Option key={i} value={country}>{country}</Option>) }
            </Select>
            <Button onClick={(e) => handleAddFavorite()}>Add favorite</Button>
            <Table className={styles.table} dataSource={favorites} columns={columns} />
        </>
    )
}

export default Favorites