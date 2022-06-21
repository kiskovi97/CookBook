import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'

var Testing = () =>
    <div className={styles.page}>
        <div className={gStyles.grid_big}>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2"target="_blank" rel="noreferrer">BookrDeeplink - book = 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_cloubot_8bf23a4efe30d6e0e7095821999f302e1c212f65e6db23cdeba663114157d222&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken"target="_blank" rel="noreferrer">Cloubot test</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_museham90_c09bba7e3da925dd5f6480c2e623f9c9cc1d84d8edb88d9ad558bc541685a92b&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken"target="_blank" rel="noreferrer">Cloubot test</a></h3>
        </div>
    </div>

export default Testing