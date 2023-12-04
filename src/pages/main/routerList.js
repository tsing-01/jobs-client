import Employer from '../employer/employer'
import Applicant from '../applicant/applicant'
import Message from '../message/message'
import Personal from '../personal/personal'
import EmployerInfo from '../employer-info/employer-info'
import ApplicantInfo from '../applicant-info/applicant-info'
import Chat from '../chat/chat'

export const navList = [
  {
      path: '/employer',
      component: Employer,
      title: 'Applicant List',
      icon: 'applicant',
      text: 'Applicant'
  },
  {
      path: '/applicant',
      component: Applicant,
      title: 'Employer List',
      icon: 'employer',
      text: 'Employer'
  },
  {
      path: '/message',
      component: Message,
      title: 'Message List',
      icon: 'message',
      text: 'Message'
  },
  {
      path: '/personal',
      component: Personal,
      title: 'User Center',
      icon: 'personal',
      text: 'Personal'
  },
]

export const subnavList = [
  {
    path: '/employerinfo',
    component: EmployerInfo,
  }, {
    path: '/applicantinfo',
    component: ApplicantInfo,
  }, {
    path: '/chat/:userid',
    component: Chat,
  }
]