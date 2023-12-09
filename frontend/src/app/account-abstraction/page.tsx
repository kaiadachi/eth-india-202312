'use client'
import React from 'react';
import ExecuteUserOperation from '../../component/ExecuteUserOperation';
import LightAccountInitalize from "@/component/LightAccountInitalize";

export default function Home() {
    return (
        <>
        <h1>Account Abstraction</h1>
            <LightAccountInitalize/>
            <ExecuteUserOperation/>
        </>
    );
}
