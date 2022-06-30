import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'

var Testing = () =>
    <div className={styles.page}>
        <h2>Cloubot</h2>
        <div className={gStyles.grid_big}>
                <h3><a href="bookrclass://?cloubotToken=iscream_cloubot_8bf23a4efe30d6e0e7095821999f302e1c212f65e6db23cdeba663114157d222&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken"target="_blank" rel="noreferrer">Cloubot test iscream_1</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_museham90_c09bba7e3da925dd5f6480c2e623f9c9cc1d84d8edb88d9ad558bc541685a92b&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken"target="_blank" rel="noreferrer">Cloubot test iscream_93</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_cloubot_8bf23a4efe30d6e0e7095821999f302e1c212f65e6db23cdeba663114157d222&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&book=2"target="_blank" rel="noreferrer">Cloubot test iscream_1 book 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_museham90_c09bba7e3da925dd5f6480c2e623f9c9cc1d84d8edb88d9ad558bc541685a92b&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&book=2"target="_blank" rel="noreferrer">Cloubot test iscream_93 book 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_cloubot_8bf23a4efe30d6e0e7095821999f302e1c212f65e6db23cdeba663114157d222&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&returnUrl=https%3A%2F%2Fwww.google.hu%2Fsearch%3Fq%3Dkeres%25C3%25A9s"target="_blank" rel="noreferrer">Cloubot test iscream_1 returnurl google-keresés paraméterrel book 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_museham90_c09bba7e3da925dd5f6480c2e623f9c9cc1d84d8edb88d9ad558bc541685a92b&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&returnUrl=https%3A%2F%2Fwww.google.hu%2Fsearch%3Fq%3Dkeres%25C3%25A9s"target="_blank" rel="noreferrer">Cloubot test iscream_93 returnurl google-keresés paraméterrel book 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_cloubot_8bf23a4efe30d6e0e7095821999f302e1c212f65e6db23cdeba663114157d222&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&returnUrl=https%3A%2F%2Fwww.google.hu%2Fsearch%3Fq%3Dkeres%25C3%25A9s&book=2"target="_blank" rel="noreferrer">Cloubot test iscream_1 returnurl google-keresés paraméterrel book 2</a></h3>
                <h3><a href="bookrclass://?cloubotToken=iscream_museham90_c09bba7e3da925dd5f6480c2e623f9c9cc1d84d8edb88d9ad558bc541685a92b&oauthUrl=https://home-learn-elibrary-lms.cloubot.com/member/oauthElibraryFromToken&returnUrl=https%3A%2F%2Fwww.google.hu%2Fsearch%3Fq%3Dkeres%25C3%25A9s&book=2"target="_blank" rel="noreferrer">Cloubot test iscream_93 returnurl google-keresés paraméterrel book 2</a></h3>
        </div>
        <h2>Staging2</h2>
        <div className={gStyles.grid_big}>
            
                <h3><a href="https://api.staging2.v2.bookrclass.com/api/oauth/sso/book/2/login/plural-mock?code=teacher"target="_blank" rel="noreferrer">plural-mock book 2 teacher</a></h3>
                <h3><a href="https://api.staging2.v2.bookrclass.com/api/oauth/sso/book/2/login/plural-mock?code=student"target="_blank" rel="noreferrer">plural-mock book 2 student</a></h3>
                <h3><a href="https://api.staging2.v2.bookrclass.com/api/oauth/sso/app/login/plural-mock?code=student" target="_blank" rel="noreferrer">plural-mock student</a></h3>
                <h3><a href="https://api.staging2.v2.bookrclass.com/api/oauth/sso/app/login/plural-mock?code=teacher"target="_blank" rel="noreferrer">plural-mock student</a></h3>
        </div>
    </div>

export default Testing

/*<h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2"target="_blank" rel="noreferrer">BookrDeeplink - book = 2</a></h3>
                */