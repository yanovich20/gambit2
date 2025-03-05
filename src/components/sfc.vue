<script type="module">

 export default{
    name:"sfc"
 }
 function sortById(){
    const store = listPhotos();
    if(store.sortObj.sortBy==="id")
    {
        if(store.sortObj.sortOrder==="asc")
            store.sortObj.sortOrder="desc";
        else
            store.sortObj.sortOrder="asc";
    }
    else
    {
        store.sortObj.sortBy="id";
        store.sortObj.sortOrder ="asc";
    }
    setSortBy(store.sortObj,sortByIdAsc,sortByIdDesc);
}
function sortByAlbum(){
    const store = listPhotos();
    if(store.sortObj.sortBy==="albumId")
    {
        if(store.sortObj.sortOrder==="asc")
            store.sortObj.sortOrder="desc";
        else
            store.sortObj.sortOrder="asc";
    }
    else{
        store.sortObj.sortBy="albumId";
        store.sortObj.sortOrder="asc";
    }
    setSortBy(store.sortObj,sortByAlbumAsc,sortByAlbumDesc);
}
function sortByTitle(){
    const store = listPhotos();
    if(store.sortObj.sortBy==="title")
    {
        if(store.sortObj.sortOrder==="asc")
            store.sortObj.sortOrder="desc";
        else
            store.sortObj.sortOrder="asc";
    }
    else{
        store.sortObj.sortBy="title";
        store.sortObj.sortOrder ="asc";
    }
    setSortBy(store.sortObj,sortByTitleAsc,sortByTitleDesc);
}
function sortByUrl(){
    const store = listPhotos();
    if(store.sortObj.sortBy==="url")
    {
        if(store.sortObj.sortOrder==="asc")
            store.sortObj.sortOrder="desc";
        else
            store.sortObj.sortOrder="asc";
    }
    else{
        store.sortObj.sortBy="url";
        store.sortObj.sortOrder ="asc";
    }
    setSortBy(store.sortObj,sortByUrlAsc,sortByUrlDesc);
}
function sortByThumbnailUrl(){
    const store = listPhotos();
    if(store.sortObj.sortBy==="thumbnailUrl")
    {
        if(store.sortObj.sortOrder==="asc")
            store.sortObj.sortOrder="desc";
        else
            store.sortObj.sortOrder="asc";
    }
    else{
        store.sortObj.sortBy="thumbnailUrl";
        store.sortObj.sortOrder ="asc";
    }
    setSortBy(store.sortObj,sortByThumbnailUrlAsc,sortByThumbnailUrlDesc);
}

function setSortBy(sortObj,callbackAsc,callbackDesc){
    const store = listPhotos();
    if(store.sortObj.sortOrder==="asc")
    {
        store.photos=store.photos.sort(callbackAsc).slice(0,30);
    }
    else
    {
        store.photos=store.photos.sort(callbackDesc).slice(0,30);
    }
    store.length=10;
    store.realLength=31;
}

const sortByIdAsc = (d1, d2) => (d1.id >= d2.id) ? 1 : -1
const sortByIdDesc = (d1, d2) => (d1.id <= d2.id) ? 1 : -1

const sortByAlbumAsc = (d1, d2) => (d1.albumId >= d2.albumId) ? 1 : -1
const sortByAlbumDesc = (d1, d2) => (d1.albumId <= d2.albumId) ? 1 : -1

const sortByTitleAsc = (d1, d2) => (d1.title >= d2.title) ? 1 : -1
const sortByTitleDesc = (d1, d2) => (d1.title <= d2.title) ? 1 : -1

const sortByUrlAsc = (d1, d2) => (d1.url >= d2.url) ? 1 : -1
const sortByUrlDesc = (d1, d2) => (d1.url <= d2.url) ? 1 : -1

const sortByThumbnailUrlAsc = (d1, d2) => (d1.thumbnailUrl >= d2.thumbnailUrl) ? 1 : -1
const sortByThumbnailUrlDesc = (d1, d2) => (d1.thumbnailUrl <= d2.thumbnailUrl) ? 1 : -1
let isLoading = false;
async function downloadMore(){
    if(isLoading === true)
        return;
    if (document.querySelector("div#sfc table").scrollHeight < document.querySelector("div#sfc table").scrollTop + 750) {
        isLoading = true;
        document.querySelector("div")
        const store = listPhotos();
        await setTimeout(function(){},500);
        await store.getPhotos();
        await nextTick();
        isLoading = false;
    }
}
async function filter(){
    let albumIds = document.querySelector("[name='albums']").value.split(" ");
    const store = listPhotos();
    store.realLength=31;
    store.length=10;
    store.albumIds = albumIds;
    const icon = document.querySelector("img.downloader");
    icon.classList.remove("hidden");
    document.querySelector("button").disabled = true;
    await store.getPhotos();
    icon.classList.add("hidden");
    document.querySelector("button").removeAttribute("disabled");
}
function showTooltip(event){
    const target = event.target;
    if(target.innerText.length<20)
        return;
    let tooltip  = document.createElement("div");
    tooltip.classList.add("open-tooltip");
    tooltip.innerText = target.innerText;
    tooltip.setAttribute("style","display:block;z-index:100;position:absolute;background-color:white; top:15px;right:15px;width:500px;");
    target.parentNode.appendChild(tooltip);
}
function hideTooltip(event){
    let tooltip = document.querySelector(".open-tooltip");
    if(tooltip)
        tooltip.remove();
}
function verifyInput(event){
   event.target.value = event.target.value.replace(/[^0-9 ]/,"");
}
 </script>
<script setup type="text/javascript">
import { ref, computed,nextTick } from "vue";
import { storeToRefs } from 'pinia';
import { listPhotos } from "../assets/store.js";
const store = listPhotos();
let refs = storeToRefs(store);
await store.getPhotos();
let photos = refs.photos;
</script>

<template>

<div id="sfc" class="block p-6 w-[700px] mx-auto relative">
    <img class="downloader hidden z-200 absolute top-[275px] left-[275px]" src="/icon.gif">
    <div class="inline-flex">
        <input type="text" class="p-5 mx-auto h-[20px] w-[350px] border-solid border-2 inline-flex" name="albums" @input="verifyInput" placeholder="Введите id">
        <button class="p-5 h-[40px] border-solid border-2 inline-flex  bg-blue-400 items-center ml-5 disabled:opacity-50" @click="filter">Поиск</button>
    </div>
  <table class="block max-w-[600px] mx-auto max-h-[600px] overflow-y-scroll"   @scroll="downloadMore">
        <thead>
            <tr>
                <th @click="sortById" class="text-red-500 text-lg p-5 max-w-[40px]">
                    Ид
                    </th>
                <th @click="sortByAlbum" class="text-red-500 text-lg max-w-[80px] p-5">
                    Альбом
                    </th>
                <th @click="sortByTitle" class="text-red-500 text-lg max-w-[150px] p-5">
                    Название
                    </th>
                <th @click="sortByUrl" class="text-red-500 text-lg max-w-[150px] p-5">
                    Ссылка
                    </th>
                <th @click="sortByThumbnailUrl" class="text-red-500 text-lg max-w-[120px] p-5">
                    Миниатюра
                    </th>
            </tr>
        </thead>
    <tbody>
        <template v-for="photo in photos">
            <tr class="relative odd:bg-white even:bg-slate-100">
                <td class="max-w-[40px] p-5">
                    {{photo.id}}
                    </td>
                <td class="max-w-[80px] p-5">
                    {{photo.albumId}}
                    </td>
                <td class="overflow-hidden whitespace-nowrap max-w-[150px] p-5" @mouseenter="showTooltip" @focus="showTooltip" @mouseleave="hideTooltip" @blur="hideToolTip">
                    {{photo.title}}
                    </td>
                <td class="overflow-hidden whitespace-nowrap max-w-[150px] p-5" @mouseenter="showTooltip" @focus="showTooltip" @mouseleave="hideTooltip" @blur="hideToolTip">
                    {{photo.url}}
                    </td>
                <td class="overflow-hidden whitespace-nowrap max-w-[120px] p-5" @mouseenter="showTooltip" @focus="showTooltip" @mouseleave="hideTooltip" @blur="hideToolTip">
                    {{photo.thumbnailUrl}}
                    </td>
                </tr>
        </template>
        </tbody>
    </table>
    </div>
    </template>
    <style>
    @import "tailwindcss";
    </style>