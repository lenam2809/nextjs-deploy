import { toast } from 'react-toastify';
import { AuthService } from '@/shared/services';
import { Meta } from '@/shared/models';

const { getOauth } = AuthService();

export function formatDateTime(strValue: string) {
  if (!strValue) {
    return '';
  } else {
    var d = new Date(strValue);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      (day >= 10 ? '' : '0') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
    if (output === '01/01/1') return '';
    return output;
  }
}
export function formatDateTimeMDY(strValue: string) {
  if (strValue === null || strValue === '') {
    return '';
  } else {
    var d = new Date(strValue);
    var month = d.getMonth() + 1;
    var day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    var output = (('' + month).length < 2 ? '0' : '') + month + '/' + day + '/' + d.getFullYear();
    if (output === '1/01/1') return '';
    return output;
  }
}

export function formatFullDateTime(strValue: string) {
  if (strValue === undefined || strValue === '' || strValue === null) {
    return '';
  } else {
    let output = '';
    let d = new Date(strValue);
    let month: any = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    let day: any = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    let hour: any = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    let minute: any = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    output = day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
    if (hour > 0) {
      output = output + ' ' + hour + ':' + minute;
    }
    if (output === '1/01/1') return '';
    return output;
  }
}
//ChageFormat datetime yyyy-mm-dd phục vụ tìm kiếm mở rộng
export function changeFormatDateTime(strValue: any) {
  if (strValue === null) {
    return '';
  } else {
    var d = new Date(strValue);
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output =
      d.getFullYear() +
      '-' +
      (('' + month).length < 2 ? '0' : '') +
      month +
      '-' +
      (('' + day).length < 2 ? '0' : '') +
      day;
    return output;
  }
}
export function formartPriceVND(strNumber: string) {
  return strNumber ? strNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : strNumber;
}
export function getStringByArray(arr: string[]) {
  var str = '';
  if (!arr) {
    return '';
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (i === 0) {
        str += arr[i];
      } else {
        str += ', ' + arr[i];
      }
    }
    return str;
  }
}

export function lowerCaseStartChar(str: string) {
  if (str) return str[0].toLowerCase() + str.substring(1);
}

export function handleChangeAction(res: any, actions: any) {
  const { meta, setSelectedItems = null } = actions;
  let newMeta: Meta = {};
  switch (res.event) {
    case 'changeSelected':
      setSelectedItems(Object.keys(res.data.selected));
      break;

    case 'changeSort':
      newMeta = Object.assign({}, meta, res.data);
      if (newMeta.sort != meta.sort) {
        meta.sort = newMeta.sort;
      }
      return newMeta;
      break;

    case 'changeKeySearch':
      newMeta = Object.assign({}, meta, res.data);
      meta.search = newMeta.search;
      return newMeta;

      break;

    case 'changePage':
      newMeta = Object.assign({}, meta, res.data);
      if (meta.page !== newMeta.page) {
        meta.page = newMeta.page;
      }
      return newMeta;

      break;

    case 'changePageSize':
      newMeta = Object.assign({}, meta, res.data);
      if (newMeta.page_size != meta.page_size) {
        meta.page_size = newMeta.page_size;
      }
      return newMeta;

      break;
  }
}

export function handleChangeActionWithAdvance(res: any, actions: any) {
  const { meta, check, setCheck, checkSearch, setCheckSearch, setSelectedItems = null } = actions;
  let newMeta: Meta = {};
  switch (res.event) {
    case 'changeSelected':
      setSelectedItems(Object.keys(res.data.selected));
      break;

    case 'changeKeySearchThuGon':
      newMeta = Object.assign({}, meta, res.data);
      if (newMeta.search != meta.search) {
        meta.search = newMeta.search;
        setCheck(false);
      }
      return newMeta;

      break;

    case 'huyTimKiemMoRong':
      newMeta = Object.assign({}, meta, res.data);
      setCheck(true);
      setCheckSearch(newMeta.search);
      meta.filter = newMeta.filter;
      return newMeta;

      break;

    case 'changeFilter':
      newMeta = Object.assign({}, meta, res.data);
      if (check) {
        newMeta.search = checkSearch;
      }
      newMeta.page = 1;
      meta.filter = newMeta.filter;
      return newMeta;

      break;

    case 'changeSort':
      newMeta = Object.assign({}, meta, res.data);
      if (newMeta.sort != meta.sort) {
        meta.sort = newMeta.sort;
      }
      return newMeta;

      break;

    case 'changeKeySearch':
      newMeta = Object.assign({}, meta, res.data);
      meta.search = newMeta.search;
      return newMeta;
      break;

    case 'changePage':
      newMeta = Object.assign({}, meta, res.data);
      if (meta.page !== newMeta.page) {
        meta.page = newMeta.page;
      }
      return newMeta;
      break;

    case 'changePageSize':
      newMeta = Object.assign({}, meta, res.data);
      if (newMeta.page_size != meta.page_size) {
        meta.page_size = newMeta.page_size;
      }
      return newMeta;
      break;
  }
}
export async function deleteAction(item: any, component: any, service: any) {
  if (await component.context.beh.confirm('Bạn có muốn xóa bản ghi này')) {
    component.setState({
      loading: true,
    });
    service.del(item.id).subscribe(
      () => {
        toast.success('Xóa thành công');
        if (component.state.data.length === 1 && component.state.meta.page !== 1) {
          component.state.setMeta({ page: component.state.meta.page - 1 });
        }
        component.fetchData(component.state.meta);
      },
      (err: any) => {
        component.setState({
          loading: false,
        });

        toast.error(err.error);
      }
    );
    component.setState({
      loading: false,
    });
  }
}

export function onKeyPressForm(ev: any) {
  const keyCode = ev.keyCode || ev.which;
  if (keyCode === 13 && 'text,number,select,checkbox'.includes(ev.target.type)) {
    ev.preventDefault();
    return false;
  }
}
/**
 * Check quyền người dùng
 * @param {any} strObjectPer: mã đối tượng
 * @param {any} strPrivilege: mã quyền
 */
export function checkPermisson(strObjectPer: any, strPrivilege: any) {
  var oauth = getOauth() || {};
  var lstRoles = oauth.lstRoles;
  if (oauth.isAdministrator) {
    return true;
  }
  if (lstRoles.length > 0) {
    for (var i = 0; i < lstRoles.length; i++) {
      if (lstRoles[i] === strObjectPer + '-' + strPrivilege) return true;
    }
  }
  return false;
}

export const flattenTree = (data: any, map: any = new Map()) => {
  data.forEach((item: any) => {
    map.set(item.value, item);
    if (item.children && item.children.length > 0) {
      flattenTree(item.children, map);
    }
  });
  return { data, map };
};

export const setValue = (value: any, map: any, mode: any, checked: any) => {
  if (['radioSelect', 'simpleSelect'].includes(mode!)) {
    let item = map.get(value);
    if (item) {
      item.checked = checked;
    }
  } else {
    (value || []).forEach((key: any) => {
      let item = map.get(key);
      if (item) {
        item.checked = checked;
        item.expanded = checked;
      }
    });
  }
};
