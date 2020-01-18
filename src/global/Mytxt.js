const fa = {
  headertxt: 'کارها',
  language: 'فارسی',
  greencolor: 'سبز',
  redcolor: 'قرمز',
  confirm: 'تایید',
  deletetitle: 'حذف!!!!!',
  deletemessage: 'واقعا می خوای حذف کنی',
  deleteyes: 'مطمئنی؟',
  deleteno: '!نه'
};
const en = {
  headertxt: 'To do',
  language: 'English',
  greencolor: 'green',
  redcolor: 'red',
  confirm: 'confirm',
  deletetitle: 'Delete?',
  deletemessage: 'Are you  sure',
  deleteyes: 'Yes',
  deleteno: '!No'
};

const Mytxt = locale => {
  switch (locale) {
    case 'fa':
      return fa;
    case 'en':
      return en;

    default:
      return fa;
  }
};
export { Mytxt };
