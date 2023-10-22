import useSWR from 'swr';
import { BaseService } from '@/shared/services';
import api from '@/shared/services/axios-custom';
import { Meta } from '@/shared/model';
class services extends BaseService {
  GetList = (meta: Meta) => {
    const { data, error, isLoading, mutate } = useSWR([this.url, meta], () => this.getMany(meta));
    return {
      data,
      error,
      isLoading,
      mutate,
    };
  };
  GetById = (id: number) => {
    const { data, error, isLoading, mutate } = useSWR(id ? `${this.url}${id}` : null, () => api.get(`${this.url}/${id}`));
    return {
      data,
      error,
      isLoading,
      mutate,
    };
  }; 
  GetTaiSan = () => {
	const { data, isLoading } = useSWR('api/astaisan', () => api.get('api/astaisan'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetDonVi = () => {
	const { data, isLoading } = useSWR('api/donvinoibo', () => api.get('api/donvinoibo'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetPhongBanChiuPhi = () => {
	const { data, isLoading } = useSWR('api/phongban', () => api.get('api/phongban'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetPhongBanQuanLy = () => {
	const { data, isLoading } = useSWR('api/phongban', () => api.get('api/phongban'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetMaDiaBan = () => {
	const { data, isLoading } = useSWR('api/diadiem', () => api.get('api/diadiem'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetMaMucDich = () => {
	const { data, isLoading } = useSWR('api/mucdichsudung', () => api.get('api/mucdichsudung'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetMaNguonGoc = () => {
	const { data, isLoading } = useSWR('api/nguongoc', () => api.get('api/nguongoc'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetTrangThaiSuDung = () => {
	const { data, isLoading } = useSWR('api/trangthaisudung', () => api.get('api/trangthaisudung'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetTinhTrangPasx = () => {
	const { data, isLoading } = useSWR('api/tinhtrangpasx', () => api.get('api/tinhtrangpasx'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetPasxDuocDuyet = () => {
	const { data, isLoading } = useSWR('api/phuongansx', () => api.get('api/phuongansx'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetCapCongTrinh = () => {
	const { data, isLoading } = useSWR('api/capcongtrinh', () => api.get('api/capcongtrinh'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetHinhThucThanhLy = () => {
	const { data, isLoading } = useSWR('api/hinhthucthanhly', () => api.get('api/hinhthucthanhly'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetLyDoBienDong = () => {
	const { data, isLoading } = useSWR('api/lydobiendong', () => api.get('api/lydobiendong'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
GetLoaiBienDong = () => {
	const { data, isLoading } = useSWR('api/loaibiendong', () => api.get('api/loaibiendong'));
	return {
	data: data?.data.map((item: any) => {
	return {
	value: item.id,
	label: item.title,
	};
	}),
	isLoading,
	};
	}; 
}
const hiNhaServices = new services("api/hinha");
export { hiNhaServices };
