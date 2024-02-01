package com.hust.techhire;

import com.hust.techhire.repository.BaseRepository;
import com.hust.techhire.service.AdminService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LogManager.getLogger(BaseRepository.class);

    @Autowired
    private AdminService adminService;

    // Cập nhật trạng thái mỗi ngày lúc 00:00
    @Scheduled(cron = "0 */5 * * * *")
    public void updateStatusJob() {
        adminService.updateStatusJob();
        log.info("Đã cập nhật trạng thái việc làm tuyển dụng");
    }
}
