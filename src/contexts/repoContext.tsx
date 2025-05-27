import React, { createContext, useEffect } from "react";
import { repoListType } from "../types/repoListType";

export const RepoContext = createContext<repoListType[]>([]);

export const RepoProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [repoList, setRepoList] = React.useState<repoListType[]>([]);
    const sessionStorageKey = 'repoList';

    useEffect(() => {
            const fetchRepoList = async () => {
                try{
                    const tempRepoList = [];
                    const resp = await fetch('http://localhost:3000/repos', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if(resp.ok){
                        const data = await resp.json();
                        tempRepoList.push(...data);
    
                        if(tempRepoList.length > 0){
                            let addedCommitRepoList = tempRepoList.map(async repo => {
                                return  await fetchCommitList(repo);
                            })
    
                            let unfilteredRepoList = await Promise.all(addedCommitRepoList);
    
                            const filteredRepoList: repoListType[] = unfilteredRepoList.filter((repo): repo is repoListType =>{
                                if(!repo) return false;
    
                                return typeof repo.numCommits === 'number' && repo.numCommits > 0;
                            })
                            .sort((a, b) => {
                                const dateA = a ? new Date(a.lastUpdated) : new Date(0);
                                const dateB = b ? new Date(b.lastUpdated) : new Date(0);
    
                                return dateB.getTime() - dateA.getTime();
                            })
    
                            setRepoList(filteredRepoList);
                            sessionStorage.setItem(sessionStorageKey, JSON.stringify(filteredRepoList));
                        }
                    }
                }catch(err){
                    console.log('Error fetching repo list: ', err);
                }
            }
    
            const cachedData = sessionStorage.getItem(sessionStorageKey);
            if(cachedData){
                const parsedData: repoListType[] = JSON.parse(cachedData);
                setRepoList(parsedData);
                return;
            }
    
            fetchRepoList();
        }, [])

        const fetchCommitList = async (repo: repoListType) => {
        try{
            const resp = await fetch(`http://localhost:3000/repos/${repo.name}/commits`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(resp.ok){
                const data = await resp.json();
                let numCommits = 0;

                data.forEach(commit => {
                    if(commit.commit.author.name === 'Ong Zi Qing' || commit.commit.author.name === 'zqpaperpiano' || commit.commit.author.name === 'Github'){
                        numCommits++;
                    }
                })
                // const numCommits = data.length;
                return {...repo, numCommits}
            }

            if(resp.status === 409){
                return {...repo, numCommits: 0};
            }
        }catch(err){
            console.log('Error fetching commit list: ', err);
        }
    }

    return (
        <RepoContext.Provider value={ repoList }>
            {children}
        </RepoContext.Provider>
    );
};